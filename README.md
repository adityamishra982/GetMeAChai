# ☕ Get Me a Chai  

Get Me a Chai is a modern web platform that allows creators, artists, and developers to receive support from their fans in a simple and transparent way.  

🔗 **Live Website**: [Visit Here] https://get-me-a-chai-opal.vercel.app/ 

---

## 🚀 Features  
- 👩‍🎨 Support for creators, artists, and developers  
- 🔒 Secure authentication with NextAuth  
- 💳 Easy payment flow for fans to contribute via Razorpay  
- 🌐 Responsive UI for both desktop and mobile  
- ⚡ Fast deployment powered by Vercel  

---

## 🛠️ Tech Stack  
- **Frontend**: Next.js, React  
- **Backend**: Node.js (API routes in Next.js)  
- **Database**: MongoDB  
- **Authentication**: NextAuth.js  
- **Payments**: Razorpay  
- **Deployment**: Vercel  

---

## 📂 Project Structure  
/app → Next.js App Router pages & components
/components → Reusable UI components
/models → MongoDB models
/api → API routes for payments and user management


---

## ⚙️ Installation & Setup  

1. Clone the repository  
   ```bash
   git clone https://github.com/yourusername/get-me-a-chai.git
   cd get-me-a-chai

2. Install dependencies
    ```bash
    npm install


3. Create a .env.local file and add the following variables:

MONGODB_URI=your_mongodb_connection
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret


4. Run the development server
    ```bash
    npm run dev


5. Build for production
    ```bash
    npm run build
    npm start