import Navbar from "@/components/marketing/Navbar"

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="h-full">
        <Navbar/>
       <main className="h-full pt-[200px] mx-auto md:px-20">
          {children}
       </main>
    </div>
    )
  }
  
  export default PlatformLayout