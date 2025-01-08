const Footer = () => {
    return (
       <footer className="py-4 md:px-8 md:py-0 bg-black text-white border-t border-gray-800 ">
        <div className="flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
         <p className="text-balence text-center text-sm leading-loose text-muted-foreground md:text-left">
         Dibuat oleh <a href="/" target="_blank" className="font-medium underline underline-offset-4">Dani </a>
         Dengan sepenuh jiwa
         </p>
        </div>
       </footer>
    );
};

export default Footer;
