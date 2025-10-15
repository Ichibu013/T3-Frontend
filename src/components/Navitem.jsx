export default function NavItem ({ name, pageKey, icon: Icon })  {
    const isActive = currentPage === pageKey || currentPage.startsWith(pageKey.slice(0, -1)); // Highlight parent page
    return (
      <a 
        href="#" 
        onClick={() => navigateTo(pageKey)}
        className={`flex items-center p-3 rounded-xl transition duration-150 ${
          isActive 
            ? 'bg-blue-600 text-white shadow-lg' 
            : 'text-gray-300 hover:bg-blue-800 hover:text-white'
        }`}
      >
        <Icon className="w-5 h-5 mr-3" />
        <span className="font-medium">{name}</span>
      </a>
    );
  };