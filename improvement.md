# Codebase Comprehensive Scan & Improvement Plan

This document outlines the findings of a deep scan across the `chronis` codebase, detailing security vulnerabilities, architectural health, new feature logic, and a frontend overhaul plan.

## 1. Code Review & Bug Hunting

### Data Privacy/Authorization Flaw (IDOR)
**The Issue:**
Currently, any logged-in user can view the behavioral data profiles of other users. This is caused by an Insecure Direct Object Reference (IDOR) in the backend routes (`dashboard.py`, `insights.py`, and `timeline.py`). The endpoints accept a `user_id` as a path parameter (e.g., `U1`, `U2`) and query the `BehavioralData` table using it, completely bypassing any checks against the `current_user`'s authorized `linked_user_id`. Furthermore, the frontend `UserSelector.jsx` freely allows users to change this ID.

**The Fix:**
We must enforce authorization by verifying that standard users can only query their assigned `linked_user_id`. 

```python
# backend/routes/dashboard.py (and similarly in insights.py & timeline.py)
@router.get("/{user_id}")
def get_dashboard_metrics(user_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Authorization Check
    if current_user.role != "admin" and user_id != current_user.linked_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this data profile")

    # Proceed with query
    if not db.query(BehavioralData).filter(BehavioralData.user_id == user_id).first():
        raise HTTPException(status_code=404, detail="No data found for user")
```

### General Health Check
- **Deprecated Code:** In `backend/auth.py`, `datetime.utcnow()` is deprecated in Python 3.12+. It should be replaced with `datetime.now(timezone.utc)`.
- **CORS Configuration:** `backend/main.py` hardcodes the Vite default port (`http://localhost:5173`). In production, this needs an environment variable array or wildcard fallback logic.
- **Frontend State Integrity:** `Settings.jsx` modifies the `default_data_user` and assumes a successful state sync, but error handling is minimal.
- **Database Consistency:** `backend/routes/users.py` checks for duplicate emails but relies on application-level filtering rather than handling SQLAlchemy `IntegrityError` safely.

---

## 2. Feature Additions & Logic

### Role-Based Authentication
To introduce an Admin Dashboard, the `User` model must be updated to include a `role` attribute.

**Backend Schema & Model Update:**
```python
# backend/models.py
class User(Base):
    # ... existing fields
    role = Column(String(50), default="user") # "admin" or "user"
```

**Login Flow:**
On the frontend, `Login.jsx` will be updated to allow users to toggle their login context. Upon successful authentication, the frontend will check the role encoded in the response or JWT and route accordingly.

```jsx
// frontend/src/pages/Login.jsx (Snippet)
<div className="flex space-x-4 mb-6">
  <button onClick={() => setRole('user')} className={`flex-1 py-2 rounded-lg ${role === 'user' ? 'bg-primary' : 'bg-surface'}`}>Standard User</button>
  <button onClick={() => setRole('admin')} className={`flex-1 py-2 rounded-lg ${role === 'admin' ? 'bg-primary' : 'bg-surface'}`}>Administrator</button>
</div>
```
*(Note: In a production app, roles are strictly enforced via the backend DB, but the login context can direct them to the `/admin` portal.)*

### Dynamic Settings Page
**Profile Photo & Username Update:**
We will add `profile_photo_url` to the `User` schema. `Profile.jsx` will include an avatar upload/change component.

**Strict Email Constraint:**
Currently, `Profile.jsx` allows email editing. We must lock this down.
1. **Frontend:** Disable the email input and remove it from the submission payload.
2. **Backend:** Remove email updating logic from the `PUT /me` endpoint.

```python
# backend/routes/users.py - Enforcing email immutability
@router.put("/me", response_model=UserResponse)
def update_user_me(user_update: UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if user_update.name:
        current_user.name = user_update.name
    if user_update.profile_photo_url:
        current_user.profile_photo_url = user_update.profile_photo_url
    
    # Intentionally ignoring any email updates to enforce constraint
    db.commit()
    db.refresh(current_user)
    return current_user
```

---

## 3. UI/UX & Frontend Overhaul

### Modern Animations
We will integrate `framer-motion` for page transitions and `gsap` for complex timeline staggering.

**Installation:** `npm install framer-motion gsap`

**Framer Motion Page Wrappers:**
```jsx
// Wrapper for all routes
import { motion } from 'framer-motion';

export const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);
```

### Layout Components
- **Landing Page:** Redesign `/` to feature an interactive Hero section using GSAP scroll triggers, feature cards, and a call-to-action.
- **Global Navbar/Footer:** Ensure `Navbar.jsx` contains cohesive links, and implement `Footer.jsx` spanning across non-auth views.
- **Developer/About Page:** Create `About.jsx` routed at `/about` highlighting the tech stack and developer info.

### Sidebar Functionality
The sidebar will be updated to support a collapsible state to maximize screen real estate.

```jsx
// frontend/src/components/Sidebar.jsx
const [isCollapsed, setIsCollapsed] = useState(false);

return (
  <motion.div 
    animate={{ width: isCollapsed ? 80 : 256 }} 
    className="h-screen bg-card border-r border-white/5 relative flex flex-col"
  >
    <button 
      onClick={() => setIsCollapsed(!isCollapsed)}
      className="absolute -right-3 top-10 bg-primary rounded-full p-1"
    >
      <ChevronRight className={`transform transition-transform ${isCollapsed ? '' : 'rotate-180'}`} />
    </button>
    {/* Nav Links */}
  </motion.div>
)
```

### Theming (Light/Dark Mode Toggle)
The UI is currently locked to dark mode. We will abstract the hardcoded hex colors in `tailwind.config.js` into CSS variables inside `index.css`.

**tailwind.config.js:**
```javascript
darkMode: 'class', // Enable class-based dark mode
theme: {
  extend: {
    colors: {
      background: 'var(--color-background)',
      surface: 'var(--color-surface)',
      card: 'var(--color-card)',
      textPrimary: 'var(--color-text-primary)',
      textSecondary: 'var(--color-text-secondary)',
    }
  }
}
```

**index.css:**
```css
@layer base {
  :root {
    --color-background: #F9FAFB;
    --color-surface: #FFFFFF;
    --color-card: #F3F4F6;
    --color-text-primary: #111827;
    --color-text-secondary: #4B5563;
  }
  .dark {
    --color-background: #0A0A0F;
    --color-surface: #13131A;
    --color-card: #1C1C26;
    --color-text-primary: #F0F0FF;
    --color-text-secondary: #8888AA;
  }
}
```

By adding a `useEffect` hook in `App.jsx` that listens to `settings.dark_mode`, we can dynamically append the `.dark` class to the `<html>` element.
