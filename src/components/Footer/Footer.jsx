
const Footer = () => {
    return (
        <div className="mt-5 ">
            <footer className="footer bg-zinc-900 text-neutral-content justify-center py-4  px-5 lg:px-20">
                <aside className="flex items-center">
                    <p className="mt-2 font-medium">Copyright © {new Date().getFullYear()} - All right reserved by TokoStore</p>
                </aside>
                
            </footer>
        </div>
    );
};

export default Footer;