import { Link } from "react-router-dom";
import { Button } from "primereact/button";



export default function HomeCard({
  title,
  description,
  iconSrc,
  buttonLabel = "Saiba mais",
  buttonLink,
}) {
  return (
    <div className="flex flex-col justify-between p-4 rounded-md w-[274px] h-[300px] shadow-[#222] shadow-lg/32">
      <div className="flex items-center gap-4">
        <img className="h-[50px]" src={iconSrc} alt="" />
        <h4 className="text-[18px] text-tertiary font-bold">{title}</h4>
      </div>
      <div className="overflow-auto">
        <p>{description}</p>
      </div>
      <Link className="w-full" to={buttonLink}>
        <Button className="w-full" style={{backgroundColor: "var(--tertiary)"}} label={buttonLabel} />
      </Link>
    </div>
  );
}

// export default function HomeCard() {
//     return (
//         <div className="flex flex-col justify-between p-4 rounded w-[274px] h-[300px] shadow-[#222] shadow-lg/32">
//             <div className="flex items-center gap-4">
//               <img className="h-[50px]" src={HeartIcon} alt="" />
//               <h4 className="text-[18px] text-tertiary font-bold">Consultas</h4>
//             </div>
//             <div className="overflow-auto">
//               <p>
//                 Informações sobre locais disponiveis para marcação de consultas, exames, etc...
//               </p>
//             </div>
//             <Button label="Saiba mais"/>
//         </div>
//     );
// }