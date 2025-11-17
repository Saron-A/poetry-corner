# 📜 Poet’s Corner — Poetry Web Application

Poet’s Corner is a full-stack poetry platform that allows users to write, upload, store, and share their poems in a beautifully crafted classic-literature theme. Built with **Node.js**, **Express**, **PostgreSQL**, and **EJS**, this web application provides writers with both a writing board and a file-upload system for submitting poems.

---

## ✨ Features

### 🖋️ Write Poems Online
- Clean, distraction-free writing interface  
- Users can compose poems directly on the site  
- Poems are saved to the database upon submission  

### 📁 Upload Existing Poems
- Upload `.txt` and `.md` poem files  
- Server reads file content and saves it as a poem  
- Optional storage of file metadata  

### 📚 Poetry Archive
- View all submitted poems  
- Each poem has a dedicated detail page displaying:
  - Title  
  - Author  
  - Body  
  - Timestamp  

### 🎨 Classic Aesthetic
- Elegant fonts (Great Vibes, Cormorant Garamond)  
- Quill-and-scroll themed UI  
- Responsive layout for mobile and desktop  

### 🔐 User Accounts
- Users can create profiles  
- Each poem is linked to its author  
- Profile page shows authored poems  

---

## 🧱 Tech Stack

### **Frontend**
- EJS Templating Engine  
- Vanilla CSS  
- Google Fonts  
- Responsive design  

### **Backend**
- Node.js  
- Express.js  
- Multer (file uploads)  
- PostgreSQL (`pg` library)  
- dotenv  

### **Database**
- `users` table  
- `poems` table  
- (optional) `uploads` table  

---

## 🚀 How the System Works

### **1. Writing Poems**
Users write poems through a form on `/write`, providing:
- title  
- body  
- user_id  
- timestamp (default `NOW()`)  

### **2. Uploading Poems**
Users upload files on `/upload`:
1. Multer accepts and stores the file  
2. The backend reads the file's text  
3. The poem is inserted into the database  
4. File name/path can also be saved  

### **3. Viewing Poems**
- `/archive` lists all poems  
- `/poems/:id` shows one poem in detail  

---

## 📂 Project Structure


---

## 🔧 Environment Variables

Create a `.env` file in the **backend** folder:

PORT=4000
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=poetry_corner


---

## 🚧 Future Improvements

Poem editing & deletion
Poem categories & tags
Image or audio attachments
Social features (likes, comments)
Full authentication system
AI poem suggestion tools

---

## 🖋️ Author

Saron A.
Aspiring full-stack developer & poet ✨
