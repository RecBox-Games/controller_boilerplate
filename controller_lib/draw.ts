import { get_context } from "./init.js";
import { Context } from "./types/context.js";
import { DEFAULT_DRAWABLE_IMG, DEFAULT_DRAWABLE_RECT, DEFAULT_DRAWABLE_TEXT, DrawableImage, DrawableRect, DrawableText } from "./types/drawables.js";
import { checkAllFieldsExist } from "./utils.js";

let Idrawables: (DrawableImage | DrawableRect | DrawableText) [] = []

export const drawablesPrint = () => {
	console.log("Drawables",Idrawables)
	for (let item of Idrawables)
		console.log(item)
}



export const drawablesRenderAll = () => {
	let ctx:Context = get_context();

	// printDrawables();
	ctx.ctx.fillStyle = "#808080";
    ctx.ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	for (let item of Idrawables)
	{
		drawableRenderSingle(ctx, item);
	}
	// Idrawables.length = 0;
}


export const drawablesAdd = (item:DrawableImage | DrawableRect | DrawableText) => {
	Idrawables.push(item);
}

export const drawableRenderSingle = (ctx:Context, drawable:DrawableImage | DrawableRect | DrawableText) =>
{

    // console.log('resize fill', ctx);
	if (checkAllFieldsExist(DEFAULT_DRAWABLE_RECT,drawable))
	{
		const rect = drawable as DrawableRect;
		if (rect.stroke == 0) {
			ctx.ctx.fillStyle = rect.color;
			ctx.ctx.fillRect(rect.boundingBox.x, rect.boundingBox.y, rect.boundingBox.w, rect.boundingBox.h);
		} else {
			ctx.ctx.strokeStyle = rect.color;
			ctx.ctx.lineWidth = rect.stroke;
			ctx.ctx.strokeRect(rect.boundingBox.x, rect.boundingBox.y, rect.boundingBox.w, rect.boundingBox.h);
		}
	}
	else if (checkAllFieldsExist(DEFAULT_DRAWABLE_IMG,drawable))
	{
		const img = drawable as DrawableImage;
		if (img.image)
		{
			ctx.ctx.setTransform(img.scale, 0, 0, img.scale, 0, 0); // sets scale and origin
			ctx.ctx.rotate(img.rotation);
			ctx.ctx.drawImage(img.image, img.x, img.y);
			ctx.ctx.setTransform(1,0,0,1,0,0);
		}
	}
	else if (checkAllFieldsExist(DEFAULT_DRAWABLE_TEXT,drawable))
	{
		const text = drawable as DrawableText;
		ctx.ctx.fillStyle = text.color;
		ctx.ctx.fillText(text.text as string, text.x, text.y);
	}
	else throw "Drawable types matches none"
}
