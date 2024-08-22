
import { FC, ReactNode } from "react";
import { cn } from "../../uitls/cn";

type TContainerProps = {
    children: ReactNode;
    className?: string;
};

const Layout: FC<TContainerProps> = ({ children, className }) => {
    return (

        <div  className={cn("w-full max-w-[1300px] mx-auto px-5", className)}>
            {children}
        </div>
    );
};

export default Layout;
