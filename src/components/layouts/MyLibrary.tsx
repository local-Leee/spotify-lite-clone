import { Button } from "@/components/ui/Button/Button";
import IconClose from "@/components/icons/IconClose";
import IconLibrary from "@/components/icons/IconLibrary";

export default function MyLibrary() {
    return (
        <nav className="w-[420px] bg-(--background-base) h-screen rounded-lg flex-shrink-0">
            <header className="flex items-center px-4 py-4">
                <h1 className="text-m font-bold pl-2">내 라이브러리</h1>
                <div className="ml-auto">
                    <Button size="small" shape="circle" className="flex items-center gap-2 px-4">
                        <IconClose size="small" plus={true} />
                        만들기
                    </Button>
                </div>
            </header>
        </nav>
    );
}
