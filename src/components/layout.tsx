import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface LayoutProps {
  apiKey: string | null;
}

const Layout = ({ apiKey }: LayoutProps) => {
  return (
    <div>
      <div>test text</div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="">
            Mode ai
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:!min-w-[90vw] !min-h-[90vh] flex flex-col p-2 sm:p-4 bg-white bgclass">
          <DialogHeader>
            <DialogTitle>Mode {apiKey}</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Layout;
