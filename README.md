# DiagramAI Web Frontend

A beautiful, modern React web application that provides an intuitive interface for generating AI-powered Mermaid.js diagrams from natural language descriptions.

## 🎯 Overview

DiagramAI Web is the frontend companion to the DiagramAI server, offering users a seamless experience to:

- Describe diagrams in plain English
- Generate Mermaid.js diagrams using AI
- Preview diagrams in real-time
- Copy and export diagram code
- Enjoy a responsive, modern UI

## ✨ Features

### 🤖 **AI-Powered Generation**

- Convert natural language descriptions into professional diagrams
- Real-time diagram generation with loading states
- Error handling for invalid inputs

### 🎨 **Beautiful User Interface**

- Modern gradient design with purple, pink, and yellow themes
- Responsive layout that works on desktop, tablet, and mobile
- Smooth animations and hover effects
- Interactive components with visual feedback

### 📊 **Live Diagram Preview**

- Real-time Mermaid.js diagram rendering
- Syntax validation and error display
- Scrollable preview for large diagrams
- Copy-to-clipboard functionality

### 🛠️ **Developer Experience**

- Built with TypeScript for type safety
- Modern React 19 with hooks
- Vite for fast development and building
- ESLint for code quality
- Hot module replacement

## 🛠️ Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Diagram Rendering**: Mermaid.js
- **Code Quality**: ESLint
- **Package Manager**: pnpm

## 📦 Installation

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- DiagramAI server running (for API calls)

### Setup

1. **Clone and navigate to the project**

   ```bash
   git clone https://github.com/brijeshdevio/DiagramAI.git
   cd DiagramAI
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment configuration**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your API configuration:

   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Build for production**
   ```bash
   pnpm build
   pnpm preview
   ```

## 🚀 Usage

### Development

Start the development server with hot reload:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Building

Create a production build:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

### Linting

Run ESLint to check code quality:

```bash
pnpm lint
```

## 🌐 API Integration

The frontend connects to the DiagramAI server API:

- **Endpoint**: `POST /api/diagram`
- **Environment Variable**: `VITE_API_URL`
- **Request Format**:

  ```json
  {
    "prompt": "Create a flowchart showing user login process"
  }
  ```

- **Response Format**:
  ```json
  {
    "response": "flowchart TD\n    A[Start] --> B[Enter Credentials]",
    "prompt": "Create a flowchart showing user login process"
  }
  ```

## 🎨 UI Components

### Main Application (`App.tsx`)

- **Header**: Branding and navigation
- **Input Panel**: Textarea for natural language input
- **Code Panel**: Generated Mermaid code with copy functionality
- **Preview Panel**: Live diagram rendering
- **Features Section**: Highlights key capabilities
- **How It Works**: Step-by-step process explanation
- **Footer**: Credits and information

### Mermaid Component (`Mermaid.tsx`)

- **Syntax Validation**: Validates Mermaid syntax before rendering
- **Error Handling**: Displays parsing and rendering errors
- **Safe Rendering**: Prevents DOM corruption from invalid code
- **Re-rendering**: Updates automatically when code changes

## 🎯 Key Features Breakdown

### 1. **Smart Input Handling**

```typescript
const [prompt, setPrompt] = useState("");
const [code, setCode] = useState("flowchart TD\nA-->B\nB-->C");
const [loading, setLoading] = useState(false);
```

### 2. **API Integration**

```typescript
const response = await fetch(import.meta.env.VITE_API_URL + "/diagram", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt }),
});
```

### 3. **Code Sanitization**

````typescript
const sanitized = data?.response
  ?.replaceAll("```mermaid", "")
  ?.replaceAll("```", "");
setCode(sanitized);
````

### 4. **Safe Mermaid Rendering**

```typescript
try {
  mermaid.initialize({ startOnLoad: false });
  mermaid.parse(chart); // Validate before rendering
  mermaid.init(undefined, mermaidDiv);
} catch (error) {
  // Handle errors gracefully
}
```

## 🎨 Styling Architecture

### Tailwind CSS Integration

- **Gradient Backgrounds**: Purple, pink, and yellow theme
- **Responsive Design**: Mobile-first approach
- **Interactive States**: Hover, focus, and active states
- **Smooth Transitions**: Animation and transform effects

### Color Palette

- **Primary**: Purple (`purple-400`, `purple-500`, `purple-700`)
- **Secondary**: Pink (`pink-300`, `pink-500`, `pink-700`)
- **Accent**: Yellow (`yellow-100`, `yellow-300`, `yellow-700`)
- **Background**: Gradient combinations of all three

## 📱 Responsive Design

- **Mobile**: Single column layout, stacked panels
- **Tablet**: Flexible layout with optimized spacing
- **Desktop**: Two-column layout with side-by-side panels
- **Large Screens**: Max-width container with centered content

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------||
| `VITE_API_URL` | DiagramAI server API URL | Yes | `http://localhost:3000/api` |

### Vite Configuration

- **Plugins**: React SWC, Tailwind CSS
- **Build Optimization**: Tree shaking, code splitting
- **Development**: Hot module replacement, fast refresh

### TypeScript Configuration

- **Strict Mode**: Full type checking enabled
- **ES Modules**: Modern JavaScript support
- **Path Resolution**: Absolute imports support

## 🚀 Deployment

### Static Hosting

```bash
pnpm build
# Deploy the `dist` folder to any static hosting service
```

### Popular Deployment Options

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `dist` folder
- **GitHub Pages**: Use GitHub Actions
- **AWS S3**: Upload `dist` to S3 bucket

### Docker Deployment

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🧪 Development Tips

### Hot Reload

The development server supports hot module replacement for instant updates during development.

### Error Handling

- Unhandled promise rejections are logged to console
- Mermaid parsing errors are displayed in the preview
- Network errors are caught and logged

### Performance

- Mermaid diagrams are rendered asynchronously
- Code sanitization prevents XSS attacks
- Responsive design reduces layout shifts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the coding standards
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Coding Standards

- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind CSS for styling
- Write meaningful component and variable names
- Handle errors gracefully

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**

   - Check if DiagramAI server is running
   - Verify `VITE_API_URL` in `.env` file
   - Check browser network tab for CORS errors

2. **Mermaid Rendering Issues**

   - Ensure generated code is valid Mermaid syntax
   - Check browser console for parsing errors
   - Try refreshing the page to reset Mermaid state

3. **Build Errors**
   - Run `pnpm install` to ensure all dependencies
   - Check TypeScript errors with `pnpm build`
   - Verify Node.js version compatibility

## 📄 License

This project is part of the DiagramAI suite and follows the same licensing terms.

## 🔗 Related Projects

- **DiagramAI Server** - Backend API for diagram generation
- **Mermaid.js** - Diagram syntax and rendering library
- **React** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework

---

**Start creating beautiful diagrams with AI!** ✨🎨
