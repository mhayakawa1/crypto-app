const Panel = (props: {children: any, className: string}) => {
    const {children, className} = props;
    return (<div className={`rounded-md bg-white text-[--dark-slate-blue] dark:text-white dark:bg-[#1e1932] ${className}`}>{children}</div>)
}
export default Panel;