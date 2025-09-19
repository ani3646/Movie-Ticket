
 
const BlurCircle = ({ top = "auto", left="auto", right="auto", bottom="auto" }) => {
    return (
        <div className="absolute -z-10  aspect-square rounded-full bg-red-500/30 blur-3xl" 
        style={{top:top, left:left, right:right, bottom:bottom, height:"200px", width:"200px"}}>

        </div>
    )
}

export default BlurCircle