# REVA University Student Registration Portal

An interactive web application for Student Registration and Authentication at REVA University (Bangalore, Karnataka). Built using **Angular**, **Node.js**, and **SQL** (XAMPP/MySQL), this system lets students register, log in, and manage their academic details with a theme matching the REVA University brand.

![REVA University Campus](https://pplx-res.cloudinary.com/image/upload/v1756970335/pplx_project_search_images/c7758b4228a5d2858e6e461a267f0ad59df0c61e.png)

## 🎯 Features

- **Login Page:** Authenticates students using credentials stored in SQL database
- **Signup Page:** New students can register with comprehensive form input; credentials stored on SQL backend
- **Student Dashboard:** Personalized information, course details, fee status, and academic summary
- **REVA University Branding:** Uses official logo colors, campus imagery, and the Srivatsa endless knot emblem
- **Form Validation:** Robust input validation for registration and authentication
- **Mock Authentication:** Simulates realistic database interactions using pre-populated student data
- **Responsive UI:** Mobile-friendly, clean, and visually consistent design
- **Auto-generated Student IDs:** Format: R2025XXXX for new registrations
- **Password Strength Validation:** Ensures secure password creation
- **Session Management:** Proper authentication and logout functionality

## 🛠️ Tech Stack

- **Frontend:** Angular 15+, Bootstrap CSS, Font Awesome Icons
- **Backend:** Node.js (Express), RESTful APIs
- **Database:** XAMPP MySQL (or local SQL server)
- **Authentication:** JWT Token-based (simulated)
- **Demo:** Mock DB included for local development
- **Styling:** Custom CSS with REVA University color scheme

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher) & npm
- Angular CLI (`npm install -g @angular/cli`)
- XAMPP (MySQL) or other SQL server
- Git

### Quick Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/reva-student-portal.git
   cd reva-student-portal
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install Angular CLI (if not installed):**
   ```bash
   npm install -g @angular/cli
   ```

4. **Configure backend:**
   - Start XAMPP and ensure MySQL is running
   - Create a database named `reva_students`
   - Import the sample student data from `/database/sample_data.sql`
   - Update `/server/config/db.config.js` with your SQL credentials:
   ```javascript
   module.exports = {
     HOST: "localhost",
     USER: "root",
     PASSWORD: "",
     DB: "reva_students",
     dialect: "mysql"
   };
   ```

5. **Run backend server:**
   ```bash
   cd server
   npm install
   node app.js
   ```

6. **Run frontend Angular app:**
   ```bash
   ng serve
   ```
   - Visit `http://localhost:4200` in your browser

## 🔑 Demo Credentials

| Role    | Username / Email          | Student ID | Password   | Description        |
|---------|--------------------------|------------|------------|-------------------|
| Student | priya.sharma@reva.edu.in | R2025001   | student123 | CSE Student       |
| Student | rahul.kumar@reva.edu.in  | R2025002   | student456 | AI&ML Student     |
| Student | sneha.patel@reva.edu.in  | R2025003   | student789 | B.Com Student     |
| Admin   | admin@reva.edu.in        | admin      | admin123   | Administrator     |

## 📱 Usage

### For Students:
1. **Login:** Visit the login page and enter your Student ID and password
2. **Registration:** New users click "Register Here" to access the signup page
3. **Dashboard:** After successful login, access personalized dashboard with course info
4. **Profile:** View and manage academic details, fee status, and personal information

### For Developers:
1. **API Endpoints:** All authentication and data fetching through RESTful APIs
2. **Database Integration:** Real-time validation against SQL backend
3. **Session Management:** Secure login/logout with proper state management
4. **Form Validation:** Client-side and server-side validation for all inputs

## 📂 Project Structure

```
reva-student-portal/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── dashboard/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── student.service.ts
│   │   └── models/
│   │       └── student.model.ts
│   ├── assets/
│   │   └── images/
│   └── styles/
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── config/
├── database/
│   └── sample_data.sql
└── README.md
```

## 🎨 REVA University Branding

The application incorporates authentic REVA University branding elements:
- **Primary Color:** Orange (#FF7A00)
- **Secondary Color:** Black (#333333)
- **Accent Color:** Gold (#FFD700)
- **Logo:** Srivatsa (endless knot) symbol
- **Campus Images:** 45-acre lush green campus visuals
- **Typography:** Professional serif and sans-serif combination

## 🧪 Testing

Run the test credentials to verify functionality:

```bash
# Frontend tests
ng test

# Backend API tests
npm run test

# End-to-end tests
ng e2e
```

## 🌟 Course Offerings

The portal supports registration for all REVA University programs:
- B.Tech Computer Science & Engineering
- B.Tech Artificial Intelligence & Machine Learning
- B.Tech Information Science & Engineering
- B.Tech Electronics & Communication Engineering
- B.Tech Mechanical Engineering
- B.Tech Civil Engineering
- B.Com, BBA, B.Arch
- M.Tech Computer Science, M.Tech AI
- MBA programs

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines:
- Follow Angular style guide
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 🐛 Known Issues

- Mock database resets on page refresh (use localStorage for persistence)
- File upload functionality not yet implemented
- Email verification system pending
- Payment gateway integration in progress

## 📋 Roadmap

- [ ] Real database integration with MySQL
- [ ] Email verification system
- [ ] Fee payment gateway integration
- [ ] Document upload functionality
- [ ] Admin panel for student management
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Advanced reporting dashboard

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

## 📞 Support

For technical support or questions about the REVA University Student Registration Portal:

- **Email:** support@reva.edu.in
- **Phone:** +91-80-4696-9999
- **Address:** REVA University, Rukmini Knowledge Park, Kattigenahalli, Yelahanka, Bangalore - 560064

## 👥 Authors

- **Development Team:** REVA University IT Department
- **Project Lead:** Student Portal Development Team
- **UI/UX Design:** Based on REVA University official branding guidelines

## 🏆 Acknowledgments

- REVA University for providing branding guidelines and requirements
- Angular community for excellent documentation and support
- Bootstrap team for responsive design framework
- Font Awesome for comprehensive icon library

---

**🎓 REVA University - Nurturing Excellence in Education**

*"Technology-based Education | 15,000+ Students | 45 Acres Campus"*