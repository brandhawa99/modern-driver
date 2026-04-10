import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { ArrowBendRightUpIcon } from "@phosphor-icons/react";
import ThemeSelector from "./ThemeSelector";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const getYear = () => {
    return new Date().getFullYear();
  }

  return (
    <footer className="max-w-8xl border-t pyt-10 mt-10" >
      <div className="flex flex-col gap-20 md:flex-row py-10">
        <p className="px-8">Navigation</p>
        <div>
          <div className="flex gap-6 flex-col px-8">
            <div className="contents">
              <FooterLink to={"/"}>/Home/</FooterLink>
              <FooterLink to={"/auction"}>/Auction/</FooterLink>
              <FooterLink to={"/showroom"}>/Showroom/</FooterLink>
              <FooterLink to={"/garage"}>/Garage/</FooterLink>
              <FooterLink to={"mailto:baltej.randhawa0@gmail.com"}>/Contact/</FooterLink>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-3 bg-accent px-2 md:px-8 flex items-center justify-between text-center">
        <div className="flex items-center justify-center gap-5">
          <Button
            onClick={scrollToTop}
            variant="link"
            className="group flex items-center gap-2"
          >
            <p className="transition-transform duration-300 group-hover:-translate-y-0.5">
              Back to top
            </p>
            <ArrowBendRightUpIcon
              size={32}
              className="rotate-12 transition-all duration-300 group-hover:rotate-6 group-hover:-translate-y-1 group-hover:scale-110"
            />
          </Button>
          <ThemeSelector />
        </div>
        <p>© {getYear()} Modern Driver. All rights reserved.</p>
        <p className="hidden md:block">Made By: Baltej Randhawa</p>
      </div>


    </footer >
  )
}

const FooterLink = ({ to, children }: { to: string, children: React.ReactNode }) => {
  return (
    <Link className="font-heading text-5xl lg:text-7xl hover:text-muted-foreground font-light transition-all duration:300" to={to}>{children}</Link>
  )
}