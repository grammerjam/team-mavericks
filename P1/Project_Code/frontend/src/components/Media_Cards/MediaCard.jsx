import { useState, useEffect } from "react";

const MediaCard = ({ movie, type }) => {

    const [imgSrc, setImgSrc] = useState("");

    // Dynamically import the image required for the media card
    useEffect(() => {
        const loadPic = async () => {
            const pic = await import(`../../assets/thumbnails/${movie.pics.regular.small}`);
            setImgSrc(pic.default);
        }

        loadPic();
    }, []);

    return (
        <>
            {
                imgSrc
                ?(
                    type.toLowerCase() == "trending"
                    ?
                        (   <div style={{ width: "440px" , height: "280px", backgroundImage: `url(${imgSrc})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                                <h2 className="heading-M" style={{ color: "white", marginTop: "15rem", fontWeight: "bolder"}}>{movie.title}</h2>
                            </div>
                        )
                    :

                        (
                            <div>
                                <img src={imgSrc} alt={movie.title} />
                                <h3 className="heading-S" style={{ color: "white"}}>{movie.title}</h3>
                            </div>
                        )
                )
                :
                    <p style={{color: "white"}}>
                        Loading ...
                    </p>
            }
        </>
    )
}

export default MediaCard;