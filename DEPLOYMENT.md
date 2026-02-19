# מדריך פריסה ל-Production

## 🚀 Backend (Render - חינם)

### שלב 1: צור Database
1. גש ל-[render.com](https://render.com) והתחבר עם GitHub
2. לחץ "New +" → "PostgreSQL"
3. שם: `ai-learning-db`
4. לחץ "Create Database"
5. **שמור את ה-Internal Database URL** (תצטרך אותו בהמשך)

### שלב 2: Deploy Backend
1. Dashboard → "New +" → "Web Service"
2. Connect Repository → בחר את ה-repo
3. הגדרות:
   - **Name:** `ai-learning-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command:** `npm run start:prod`

### שלב 3: Environment Variables
לחץ "Advanced" והוסף:
```
DATABASE_URL=[הדבק את ה-Internal Database URL]
JWT_SECRET=WVF8qjgMHlwTi9uOkRh6QKyEAGL1vcfB5Co4JxpsSrUDta2XmPI37nYNZdbe0z
NODE_ENV=production
OPENAI_API_KEY=[YOUR_OPENAI_API_KEY]
```

### שלב 4: Deploy
לחץ "Create Web Service" → המתן 5-10 דקות

תקבל URL כמו: `https://ai-learning-backend.onrender.com`

**שמור את ה-URL הזה!**

---

## ☁️ Frontend (Vercel - חינם)

### שלב 1: Deploy ל-Vercel
1. גש ל-[vercel.com](https://vercel.com) והתחבר עם GitHub
2. לחץ "Add New..." → "Project"
3. בחר את ה-repo שלך
4. הגדרות:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

### שלב 2: Environment Variables
לפני Deploy, לחץ "Environment Variables" והוסף:
```
REACT_APP_API_URL=https://ai-learning-backend.onrender.com
```
(החלף ב-URL שקיבלת מ-Render)

### שלב 3: Deploy
לחץ "Deploy" → המתן 2-3 דקות

תקבל URL כמו: `https://your-project.vercel.app`

---

## 🔗 חיבור Backend ל-Frontend

### עדכן CORS ב-Render
1. חזור ל-Render → Backend Service
2. Environment → הוסף משתנה חדש:
```
FRONTEND_URL=https://your-project.vercel.app
```
3. לחץ "Save Changes" → השרת יעשה redeploy אוטומטית

---

## ✅ בדיקה

1. גש ל-URL של ה-Frontend
2. נסה להירשם
3. נסה להתחבר
4. שלח שאלה

**אם הבקשה הראשונה לוקחת 30 שניות - זה תקין!** (Render מעיר את השרת)

---

## 🐛 פתרון בעיות

### שגיאת CORS
וודא ש-FRONTEND_URL מוגדר נכון ב-Render

### שגיאת Database
וודא ש-DATABASE_URL מוגדר נכון ב-Render

### השרת לא עונה
Render Free Tier נרדם אחרי 15 דקות - הבקשה הראשונה תיקח זמן

---

## 💰 עלויות

- **Render:** חינם (Backend + DB)
- **Vercel:** חינם (Frontend)
- **סה"כ:** 0₪/חודש 🎉
