interface PublicLayoutProps {
    children : React.ReactNode;
}

const PublicLayout = ({
    children
} : PublicLayoutProps ) => {
    return (
        <main className="h-full overflow-y-auto relative">
            {children}
        </main>
    )
}

export default PublicLayout;
