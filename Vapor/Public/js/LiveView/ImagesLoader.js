// 图片名
const backgroundImg = (function() {
  let bgs = [];
  for (let i = 0; i < 3; i++) {
    bgs[i] = "/images/Background/BG" + BackID + "-" + i + ".png";
  }
  return bgs;
})();
const arrowImg = "/images/Items/DirArrow.png";
const blockImg = ["Normal.png", "Red.png", "Yellow.png", "Green.png", "Blue.png", "Purple.png", "Dark.png"];
const diamondImg = ["Diamond-0.png", "Diamond-1.png", "Diamond-2.png", "Diamond-3.png"];
const loadingImg = ["Loading-0.png", "Loading-1.png", "Loading-2.png", "Loading-3.png", "Loading-4.png"];
const successImg = "/images/Message/Congratulations.png";
const failureImg = "/images/Message/TryAgain.png";
const miniLappImg = "/images/Lappland/Mini.png";
const lappShockImg = "Shock.png";
const bubbleImg = ["Emo-happy.png", "Emo-dizzy.png", "Emo-1.png", "Emo-2.png", "Emo-2.png", "Emo-sad.png", "Emo-sad.png", "Emo-3.png"];
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
var backgroundTextures;
var arrowTexture;
var itemsTextures = {"Block": [], "Diamond": []};
var lappTextures = {"Hair": [], "Tail": [], "Ribbon": [], "Face": [], "Clothes": [],
                    "Leg": [], "ArmB": [], "ArmF": [], "Shadow":[], "Shock": [],
                    "Bubble": {0: [], 1: [], 2: [], 3: []}};
var loadingTextures;
var successTexture;
var failureTexture;
var miniLappTexture;

/** 获取某个Texture列表的一部分 */
function getPartTextures(allTextures, allImgs, addition) {
  let partTextures = [];
  for (let i = 0; i < allImgs.length; i++) {
    partTextures.push(allTextures[addition + allImgs[i]]);
  }
  return partTextures;
}

// 对象
var background;
var foreground;
var lappland;

// 加载全部图片
const loader = PIXI.Loader.shared;
loader
.add("bg0", backgroundImg[0])
.add("bg1", backgroundImg[1])
.add("bg2", backgroundImg[2])
.add("arr", arrowImg)
.add("items", "/images/Items/All.json")
.add("lapp", "/images/Lappland/All.json")
.add("load", "/images/Message/Load.json")
.add("suc", successImg)
.add("fail", failureImg)
.add("miniLapp", miniLappImg)
.load((loader, resources) =>  {
  backgroundTextures = [resources.bg0.texture, resources.bg1.texture, resources.bg2.texture];
  arrowTexture = resources.arr.texture;
  successTexture = resources.suc.texture;
  failureTexture = resources.fail.texture;
  miniLappTexture = resources.miniLapp.texture;
  loadingTextures = getPartTextures(resources.load.textures, loadingImg, "");
  itemsTextures["Block"] = getPartTextures(resources.items.textures, blockImg, "");
  itemsTextures["Diamond"] = getPartTextures(resources.items.textures, diamondImg, "");
  console.log("Items Images is Loaded");
  let textures = resources.lapp.textures;
  for (let i = 0; i < 4; i++) { // 方向 [L, U(R), R, D(L)]
    let addition = (i == 0 || i == 3) ? ("L-") : ("R-");
    lappTextures["Hair"][i] = getPartTextures(textures, lappHairImg, addition);
    lappTextures["Tail"][i] = getPartTextures(textures, lappTailImg, addition);
    lappTextures["Ribbon"][i] = getPartTextures(textures, lappRibbonImg, addition);
    lappTextures["Face"][i] = getPartTextures(textures, lappFaceImg, addition);
    lappTextures["Clothes"][i] = textures[addition + lappClothesImg];
    lappTextures["Leg"][i] = getPartTextures(textures, lappLegImg, addition);
    lappTextures["ArmB"][i] = getPartTextures(textures, lappArmBImg, addition);
    lappTextures["ArmF"][i] = getPartTextures(textures, lappArmFImg, addition);
    lappTextures["Shadow"][i] = textures[addition + lappShadowImg];
    lappTextures["Shock"][i] = textures[addition + lappShockImg];
    for (let j = 0; j < bubbleImg.length; j++) {
      lappTextures["Bubble"][i][j] = textures[addition + bubbleImg[j]];
    }
  }
  console.log("Lappland Images is Loaded");

  // 初始化当前Puzzle状态
  puzzle = new Puzzle();

  // GET方法从后端获取数据以布局 Puzzle
  $.get("/spo/" + PID + "/scene", function(data, status) {
    // alert("Get Scene " + pid + ": \n" + JSON.stringify(data));
    SceneData = data;
    console.log("Scene Data Already Inited: " + SceneData.puzzle.description);
    // 添加人物 Sprite
    lappland = new Lappland();
    // 添加前景 Sprite
    foreground = new Foreground();
    // 添加背景 Sprite
    background = new Background();
    // 添加小地图
    puzzleMap = new PuzzleMap();
  })
});
