export default function Category(props){
    return (
        <div 
            className={`category ${props.isActive ? 'active' : ''}`} 
            onClick={()=>{props.onClick(props.id)}}
        >
            {props.categoryName}
        </div>
    )
}