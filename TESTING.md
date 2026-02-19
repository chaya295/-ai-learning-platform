# מדריך בדיקות (Testing Guide)

## התקנה

### Frontend
```bash
cd frontend
npm install
```

### Backend
```bash
cd backend
npm install
```

## הרצת בדיקות

### Frontend
```bash
cd frontend
npm test                    # הרצה רגילה
npm test -- --coverage      # עם כיסוי קוד
npm test -- --watchAll=false # ללא watch mode
```

### Backend
```bash
cd backend
npm test                    # הרצה רגילה
npm test -- --coverage      # עם כיסוי קוד
```

## מבנה הבדיקות

### Frontend (`frontend/src/`)
- `config.test.ts` - בדיקות הגדרות
- `api/client.test.ts` - בדיקות API client

### Backend (`backend/src/`)
- `auth/auth.service.spec.ts` - בדיקות אימות
- `users/users.service.spec.ts` - בדיקות משתמשים

## CI/CD

הבדיקות רצות אוטומטית ב-GitHub Actions על כל push/PR.

## כיסוי קוד מינימלי

- Branches: 50%
- Functions: 50%
- Lines: 50%
- Statements: 50%

## הוספת בדיקות חדשות

1. צור קובץ `*.test.ts` (Frontend) או `*.spec.ts` (Backend)
2. הרץ `npm test` לוודא שהכל עובד
3. עשה commit ו-push
