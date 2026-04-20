# ✈️ TRAVEL AGENCY - Premium Travel Agency UI

A sophisticated, premium travel agency website built with Express.js and EJS. Featuring luxury design, modern UI/UX, and easy-to-use interface.

## Backend Update

The backend is configured for MongoDB Atlas via `MONGO_URI`.

Add this to your `.env` file and replace `your-cluster.mongodb.net` with your actual Atlas cluster host:

```txt
MONGO_URI=mongodb+srv://ashutoshkumar58724_db_user:W0pxYOpki3bqaCww@your-cluster.mongodb.net/travelagency?retryWrites=true&w=majority&appName=Cluster0
```

The current password `W0pxYOpki3bqaCww` can be used directly in the connection string because it does not contain special URI characters.

If you deploy on Render, also make sure MongoDB Atlas Network Access allows the Render service to connect. For quick testing, many setups use `0.0.0.0/0` in Atlas and then tighten it later.

## Project Layout

The active project is now separated by responsibility:

- `backend/` for Express server code
- `frontend/` for EJS views and static assets
- `database/` for MongoDB models
- `deployment/` for deployment guidance
- `legacy/` for old duplicated project files kept out of the active app path

## 🎨 Design Features

### **Premium Aesthetic**
- **Luxury Color Scheme**: Dark navy backgrounds with gold/orange accents
- **Glass Morphism**: Frosted glass effects with backdrop blur
- **Smooth Animations**: Hover effects, fade-ins, and transitions
- **Responsive Design**: Works seamlessly on all devices
- **Professional Typography**: Modern font hierarchy and spacing

### **User Experience**
- **Intuitive Navigation**: Clear menu structure across all pages
- **Interactive Elements**: Button ripple effects, smooth scrolling
- **Form Validation**: User-friendly contact and booking forms
- **Card-Based Layout**: Easy to scan and interact with
- **Visual Feedback**: Hover states and active indicators

## 📁 Project Structure

```
TravelAgency/
├── index.js              # Express server setup
├── package.json          # Dependencies
├── public/
│   ├── style.css        # Premium styling (all pages)
│   └── script.js        # Interactive features
└── ui/                  # EJS templates
    ├── index.ejs        # Homepage with hero section
    ├── destination.ejs  # Destinations showcase (6+ locations)
    ├── services.ejs     # Premium services (flights, hotels, etc.)
    ├── food.ejs         # Culinary experiences
    ├── rental.ejs       # Luxury vehicles & yachts
    ├── about.ejs        # Company information
    ├── contact.ejs      # Contact form & info
    ├── login.ejs        # User login
    └── register.ejs     # User registration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start the server:**
```bash
node index.js
```

3. **Open in browser:**
```
http://localhost:3000
```

## 📄 Pages & Features

### 🏠 **Homepage** (`/`)
- Hero section with call-to-action buttons
- Featured destinations showcase
- Why Choose Us section with premium features
- Full navigation bar and footer

### 🌍 **Destinations** (`/destination`)
- 6 world destinations with pricing
- Beautiful emoji-based icons
- Quick booking buttons
- Detailed descriptions

### 💎 **Services** (`/services`)
- Premium flight arrangements
- 5-star accommodations
- Gourmet dining
- Travel insurance
- Custom itineraries
- Luxury transportation

### 🍽️ **Food & Cuisine** (`/food`)
- Italian Cuisine
- Japanese Omakase
- French Haute Cuisine
- Asian Fusion
- Premium Steakhouse
- Wine Tasting Tours

### 🚗 **Rentals** (`/rental`)
- Luxury sports cars
- Premium SUVs
- Luxury sedans
- Yacht charters
- Speed boats
- Private jets

### 👑 **About** (`/about`)
- Company story since 2020
- Award highlights
- Global presence
- Expert team
- Exclusive network
- Core commitment

### 📞 **Contact** (`/contact`)
- Contact form with fields for:
  - Name, email, phone
  - Trip date
  - Message
- Office locations (NY, London, Dubai)
- Business hours
- Multiple contact channels
- 24/7 emergency support

### 🔐 **Login** (`/login`)
- Email and password fields
- Remember me option
- Forgot password link
- Social login options (Google, Apple)

### 📝 **Register** (`/register`)
- First and last name fields
- Email and password
- Phone number
- Destination preference dropdown
- Terms & conditions agreement
- Social signup options

## 🎯 Premium Design Elements

### Color Palette
```
Primary (Dark Navy): #0f172a
Secondary: #1e293b
Accent (Gold): #fbbf24
Accent Light: #fcd34d
Text Light: #f1f5f9
Text Muted: #cbd5e1
```

### Key Features
- **Sticky Navigation**: Always accessible navbar with glass effect
- **Gradient Backgrounds**: Linear gradients for premium feel
- **Card Components**: Hover effects with border highlighting
- **Backdrop Blur**: 10px blur effects for depth
- **Smooth Transitions**: 0.3-0.6s ease animations
- **Icon Support**: Emoji icons for visual interest

## 💻 Technologies Used

- **Backend**: Express.js (Node.js)
- **Frontend**: EJS Templates
- **Styling**: Pure CSS3 with advanced features:
  - CSS Grid & Flexbox
  - Backdrop Filter (Glass morphism)
  - CSS Animations
  - CSS Variables
- **JavaScript**: Vanilla JS for interactivity
  - Event listeners
  - Intersection Observer API
  - Dynamic styling

## ✨ Interactive Features

- **Ripple Button Effects**: Animated feedback on clicks
- **Lazy Loading**: Cards animate in as you scroll
- **Smooth Scrolling**: Navigation links scroll smoothly
- **Form Validation**: Real-time form feedback
- **Navbar Scroll Effect**: Background changes on scroll
- **Responsive Design**: Mobile-first approach

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (full features)
- **Tablet**: 768px-1199px (optimized layout)
- **Mobile**: <768px (single column layout)

## 🔧 Customization

### Change Colors
Edit `:root` variables in `public/style.css`:
```css
:root {
    --primary: #0f172a;      /* Change primary color */
    --accent: #fbbf24;       /* Change accent color */
    --text-light: #f1f5f9;   /* Change text color */
}
```

### Modify Content
Edit the EJS files in `ui/` folder to change:
- Destination names and prices
- Service descriptions
- Contact information
- Company information

### Add Routes
Edit `index.js` to add new pages:
```javascript
app.get('/newpage', (req, res) => {
    res.render('newpage');
});
```

## 📊 Performance Features

- **CSS Optimization**: Organized stylesheet with comments
- **Lazy Loading**: Cards only animate when visible
- **No External Dependencies**: Pure CSS/JS (except Express)
- **Minimal Asset Size**: Optimized for fast loading

## 🎓 Code Quality

- **Semantic HTML**: Proper heading hierarchy and structure
- **CSS Organization**: Grouped by sections with comments
- **Progressive Enhancement**: Graceful degradation
- **Accessibility Ready**: Semantic elements and form labels

## 🤝 Usage Tips

1. **Update Company Info**: Change "Travel Agency" to your brand
2. **Add Real Images**: Replace emoji with image links
3. **Connect Database**: Link forms to a backend database
4. **Add Email Service**: Integrate contact form with email
5. **Customize Pricing**: Update all price values

## 📝 License

This premium UI is ready for commercial use. Customize it for your travel business!

---

**Built for luxury travel experiences** ✈️💎

For updates and support, customize the `/contact` page with your actual contact details.




