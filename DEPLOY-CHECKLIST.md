# ✅ רשימת משימות לפריסה

## 📦 הכנה (עשה פעם אחת)

- [x] קבצי הגדרה נוצרו
- [ ] העלה את הקוד ל-GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push
```

---

## 🖥️ Backend (Render)

### 1. צור Database (5 דקות)
- [ ] גש ל-render.com
- [ ] New + → PostgreSQL
- [ ] שם: `ai-learning-db`
- [ ] Create Database
- [ ] העתק את ה-Internal Database URL

### 2. Deploy Backend (10 דקות)
- [ ] New + → Web Service
- [ ] בחר repo
- [ ] Root Directory: `backend`
- [ ] Build: `npm install && npx prisma generate && npx prisma migrate deploy`
- [ ] Start: `npm run start:prod`

### 3. Environment Variables
הוסף:
```
DATABASE_URL=[הדבק כאן]
JWT_SECRET=WVF8qjgMHlwTi9uOkRh6QKyEAGL1vcfB5Co4JxpsSrUDta2XmPI37nYNZdbe0z
NODE_ENV=production
OPENAI_API_KEY=[YOUR_OPENAI_API_KEY]
```

- [ ] Create Web Service
- [ ] שמור את ה-URL: `https://__________.onrender.com`

---

## 💻 Frontend (Vercel)

### 1. Deploy Frontend (5 דקות)
- [ ] גש ל-vercel.com
- [ ] Add New → Project
- [ ] בחר repo
- [ ] Root Directory: `frontend`

### 2. Environment Variables
הוסף:
```
REACT_APP_API_URL=https://__________.onrender.com
```
(הדבק את ה-URL מ-Render)

- [ ] Deploy
- [ ] שמור את ה-URL: `https://__________.vercel.app`

---

## 🔗 חיבור (2 דקות)

### עדכן Backend
- [ ] חזור ל-Render → Backend
- [ ] Environment → הוסף:
```
FRONTEND_URL=https://__________.vercel.app
```
(הדבק את ה-URL מ-Vercel)

- [ ] Save Changes

---

## ✅ בדיקה

- [ ] גש ל-Frontend URL
- [ ] נסה להירשם
- [ ] נסה להתחבר
- [ ] שלח שאלה

**הבקשה הראשונה תיקח 30 שניות - זה תקין!**

---

## 🎉 סיימת!

Frontend: https://__________.vercel.app
Backend: https://__________.onrender.com
עלות: 0₪/חודש
