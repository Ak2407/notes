import { ExternalLinkIcon } from "@radix-ui/react-icons";
import GenerateButton from "./GenerateButton";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { SocialLinks } from "@/constants";

const Navbar = () => {
  return (
    <nav className="border-b p-2 flex  flex-col-reverse lg:flex-row items-center justify-center gap-2 w-full bg-zinc-100 ">
      <GenerateButton />
      <div className="flex items-center justify-center gap-2 h-full w-full lg:w-fit">
        {SocialLinks.map((link, index) => {
          return (
            <>
              <a href={link.href} target="_blank" key={index}>
                <Button
                  variant="link"
                  className="flex items-center justify-center gap-2"
                >
                  <h1>{link.name}</h1>
                  <ExternalLinkIcon className="h-3 w-3" />
                </Button>
              </a>

              {index < SocialLinks.length - 1 && (
                <Separator orientation="vertical" />
              )}
            </>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
