import "@/app/globals.css" // Fixed CSS import path

export const metadata = {
  title: "Admin Dashboard - Portfolio",
  description: "Admin dashboard for managing portfolio content",
}

export default function AdminLayout({ children }) {
  return <div className="admin-layout">{children}</div>
}
