import { useState, useEffect } from "react";

const MediaCard = ({ movie, type }) => {

    const [imgSrc, setImgSrc] = useState("");

    // Dynamically import the image required for the media card
    useEffect(() => {
        const loadPic = async () => {
            const pic = await import(`../../assets/thumbnails/${movie.pics.regular.medium}`);
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
                        (   <div className="trending-media-card" style={{backgroundImage: `url(${imgSrc})`}}>
                                <div className="trending-media-info">
                                    <div className="media-info">
                                        <h4 className="media-info-item">{movie.year} •</h4>
                                        <h4 className="media-info-item">{movie.category} •</h4>
                                        <h4 className="media-info-item">{movie.rating}</h4>
                                    </div>
                                    <div className="media-title">{movie.title}</div>
                                </div>
                            </div>
                        )
                    :

                        (
                            <div>
                                <img src={imgSrc} alt={movie.title} />
                                <div className="media-info">
                                    <h4 className="media-info-item">{movie.year} •</h4>
                                    <h4 className="media-info-item">{movie.category} •</h4>
                                    <h4 className="media-info-item">{movie.rating}</h4>
                                </div>
                                <div className="media-title">{movie.title}</div>
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

