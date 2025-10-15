import Image from "next/image";

export default function Header() {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });

  return (
    <header className="w-full bg-white ">
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4 sm:py-6 lg:py-8">
        
        {/* Left section with Logo and Brand */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <Image
              src="/assets/logo.png"
              alt="Podcastr Logo"
              width={36}
              height={36}
              className="w-[32px] sm:w-[36px] h-auto"
            />
            <h1 className="text-lg font-semibold text-gray-900">Podcastr</h1>
          </div>
  
          {/* Vertical Separator */}
          <div className="hidden sm:block w-[1px] h-6 bg-gray-300" />
  
          {/* Search/Tagline Section */}
          <div className="hidden sm:block flex-1 max-w-md lg:max-w-lg ml-2">
            <p className="text-sm font-normal leading-relaxed text-gray-400">
              O melhor para você ouvir, sempre
            </p>
          </div>
        </div>
  
        {/* Right section with Date - Hidden on mobile */}
        <div className="hidden sm:block">
          <p className="text-sm font-normal leading-relaxed text-right text-gray-600">
            {currentDate}
          </p>
        </div>
  
      </div>
    </div>
  </header>
  
  );
}
