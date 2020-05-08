// 图片名
const backgroundImg = "/images/Background/BG2-0.png";
const lappHairImg = ["Hair-0.png", "Hair-1.png", "Hair-2.png", "Hair-3.png"];
const lappTailImg = ["Tail-0.png", "Tail-1.png", "Tail-2.png", "Tail-3.png"];
const lappRibbonImg = ["Ribbon-0.png", "Ribbon-1.png", "Ribbon-2.png", "Ribbon-3.png"];
const lappFaceImg = ["Face-0.png", "Face-1.png", "Face-2.png", "Face-3.png", "Face-4.png"];
const lappClothesImg = "Clothes.png";
const lappLegImg = ["Leg.png", "Leg-1.png", "Leg-2.png", "Leg-3.png", "Leg-4.png", "Leg-5.png", "Leg-6.png",
                    "Leg-7.png", "Leg-8.png", "Leg-9.png", "Leg-10.png", "Leg-11.png", "Leg-12.png"];
const lappArmBImg = ["ArmB.png", "ArmB-1.png", "ArmB-2.png", "ArmB-3.png", "ArmB-4.png", "ArmB-5.png", "ArmB-6.png",
                     "ArmB-7.png", "ArmB-8.png", "ArmB-9.png", "ArmB-10.png", "ArmB-11.png", "ArmB-12.png"];
const lappArmFImg = ["ArmF.png", "ArmF-1.png", "ArmF-2.png", "ArmF-3.png", "ArmF-4.png", "ArmF-5.png", "ArmF-6.png",
                     "ArmF-7.png", "ArmF-8.png", "ArmF-9.png", "ArmF-10.png", "ArmF-11.png", "ArmF-12.png"];
const lappShadowImg = "Shadow.png";

// 纹理
var backgroundTexture;
var lappTextures = {"Hair": [], "Tail": [], "Ribbon": [], "Face": [], "Clothes": [],
                    "Leg": [], "ArmB": [], "ArmF": [], "Shadow":[]};

/** 获取某个Texture列表的一部分 */
function getPartTextures(allTextures, allImgs, addition) {
  let partTextures = [];
  for (let i = 0; i < allImgs.length; i++) {
    partTextures.push(allTextures[addition + allImgs[i]]);
  }
  return partTextures;
}

// 对象
var c1lappland;

// 加载全部图片
const loader = PIXI.Loader.shared;
loader
.add("bg", backgroundImg)
.add("lapp", "/images/Lappland/All.json")
.load((loader, resources) =>  {
  backgroundTexture = resources.bg.texture;
  let textures = resources.lapp.textures;
  let addition = ("R-");
  lappTextures["Hair"][2] = getPartTextures(textures, lappHairImg, addition);
  lappTextures["Tail"][2] = getPartTextures(textures, lappTailImg, addition);
  lappTextures["Ribbon"][2] = getPartTextures(textures, lappRibbonImg, addition);
  lappTextures["Face"][2] = getPartTextures(textures, lappFaceImg, addition);
  lappTextures["Clothes"][2] = textures[addition + lappClothesImg];
  lappTextures["Leg"][2] = getPartTextures(textures, lappLegImg, addition);
  lappTextures["ArmB"][2] = getPartTextures(textures, lappArmBImg, addition);
  lappTextures["ArmF"][2] = getPartTextures(textures, lappArmFImg, addition);
  lappTextures["Shadow"][2] = textures[addition + lappShadowImg];
  c1lappland = new C1Lappland();
});
