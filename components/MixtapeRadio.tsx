"use client"
import usePlayer from "@/stores/usePlayer"

interface MixtapeRadioProps {
  
}

const MixtapeRadio: React.FC<MixtapeRadioProps> = ({}) => {
   const { activePlayer, activeHowl } = usePlayer()
  return (
    <div className="fixed bottom-0 w-full lg:w-[860px] bg-black border-t-2 border-r-2 border-white">
       MixtapeRadio
    </div>
   )
}

export default MixtapeRadio