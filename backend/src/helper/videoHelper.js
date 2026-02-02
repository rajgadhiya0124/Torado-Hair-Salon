export const getEmbedVideoUrl = (url)=>{

    if (!url) return "";

    if(url.includes("watch?v=")){
        return url.replace("watch?v=", "embed/");
    }

    if (url.includes("youtu.be/")) {
        return url.replace("youtu.be/", "youtube.com/embed/");
    }

    return url;
}