import style from "./icon.module.css";

export const Icon = ({ id, size = 24, className = '', ...props }) => {
    return (
        <div className={`${style.icon} ${className}`} {...props}>
            <i className={`fa ${id}`} style={{ fontSize: `${size}px` }} aria-hidden="true"></i>
        </div>
    )
}