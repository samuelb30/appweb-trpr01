export function loadImg(url: string): Promise<void>{
    return new Promise((resolve, reject) =>{
        const img = new Image()
        img.src = url
        img.onload = () => resolve()
        img.onerror = () => reject(new Error("Error when loading image. Maybe the url isn't an image ?"))
    })
}