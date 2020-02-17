// 图片 - 背景
let backgroundImg = new Image();
backgroundImg.src = "/images/Background.jpg";

// 图片 - 前景
let blockNormalImg = new Image();
blockNormalImg.src = "/images/Blocks/Normal.png";
let blockRedImg = new Image();
blockRedImg.src = "/images/Blocks/Red.png";
let blockYellowImg = new Image();
blockYellowImg.src = "/images/Blocks/Yellow.png";
let blockGreenImg = new Image();
blockGreenImg.src = "/images/Blocks/Green.png";
let blockBlueImg = new Image();
blockBlueImg.src = "/images/Blocks/Blue.png";
let blockPurpleImg = new Image();
blockPurpleImg.src = "/images/Blocks/Purple.png";
let blockDarkImg = new Image();
blockDarkImg.src = "/images/Blocks/Dark.png";

// 图片 - Items
let diamondImg = [new Image(), new Image(), new Image(), new Image()];
diamondImg[0].src = "/images/Items/Diamond-0.png";
diamondImg[1].src = "/images/Items/Diamond-1.png";
diamondImg[2].src = "/images/Items/Diamond-2.png";
diamondImg[3].src = "/images/Items/Diamond-3.png";
let arrayDownImg = [new Image(), new Image(), new Image(), new Image(), new Image()];
arrayDownImg[0].src = "/images/Items/ArrayDown-0.png";
arrayDownImg[1].src = "/images/Items/ArrayDown-1.png";
arrayDownImg[2].src = "/images/Items/ArrayDown-2.png";
arrayDownImg[3].src = "/images/Items/ArrayDown-3.png";
arrayDownImg[4].src = "/images/Items/ArrayDown-4.png";
let arrayUpImg = [new Image(), new Image(), new Image(), new Image(), new Image()];
arrayUpImg[0].src = "/images/Items/ArrayUp-0.png";
arrayUpImg[0].src = "/images/Items/ArrayUp-1.png";
arrayUpImg[0].src = "/images/Items/ArrayUp-2.png";
arrayUpImg[0].src = "/images/Items/ArrayUp-3.png";
arrayUpImg[0].src = "/images/Items/ArrayUp-4.png";

// 图片 - PuzzleMessage
let pzMsgLoadingImg = [new Image(), new Image(), new Image(), new Image()];
pzMsgLoadingImg[0].src = "/images/Message/Loading-0.png";
pzMsgLoadingImg[1].src = "/images/Message/Loading-1.png";
pzMsgLoadingImg[2].src = "/images/Message/Loading-2.png";
pzMsgLoadingImg[3].src = "/images/Message/Loading-3.png";
let pzMsgSuccessImg = new Image();
pzMsgSuccessImg.src = "/images/Message/Congratulations.png";
let pzMsgFailureImg = new Image();
pzMsgFailureImg.src = "/images/Message/TryAgain.png";

// 图片 - Lappland - Mini
let miniLappImg = new Image();
miniLappImg.src = "/images/Lappland/Mini.png";
// 图片 - Lappland - Right Direction
// Shock
let rLappShockImg = new Image();
rLappShockImg.src = "/images/Lappland/R/Shock.png";
// Bubbles
let rLappBubble1Img = new Image();
rLappBubble1Img.src = "/images/Lappland/R/Bubbles/Emo-1.png";
let rLappBubble2Img = new Image();
rLappBubble2Img.src = "/images/Lappland/R/Bubbles/Emo-2.png";
let rLappBubble3Img = new Image();
rLappBubble3Img.src = "/images/Lappland/R/Bubbles/Emo-3.png";
let rLappBubbleDizzyImg = new Image();
rLappBubbleDizzyImg.src = "/images/Lappland/R/Bubbles/Emo-dizzy.png";
let rLappBubbleSadImg = new Image();
rLappBubbleSadImg.src = "/images/Lappland/R/Bubbles/Emo-sad.png";
let rLappBubbleHappyImg = new Image();
rLappBubbleHappyImg.src = "/images/Lappland/R/Bubbles/Emo-happy.png";
// N: 0-1-2-2-1-0-...
let rLappHairImg = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
rLappHairImg[0].src = "/images/Lappland/R/Hair-0.png";
rLappHairImg[1].src = "/images/Lappland/R/Hair-1.png";
rLappHairImg[2].src = "/images/Lappland/R/Hair-2.png";
rLappHairImg[3].src = "/images/Lappland/R/Hair-2.png";
rLappHairImg[4].src = "/images/Lappland/R/Hair-1.png";
rLappHairImg[5].src = "/images/Lappland/R/Hair-0.png";
// N: 0-1-2-2-1-0-...
let rLappTailImg = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
rLappTailImg[0].src = "/images/Lappland/R/Tail-0.png";
rLappTailImg[1].src = "/images/Lappland/R/Tail-1.png";
rLappTailImg[2].src = "/images/Lappland/R/Tail-2.png";
rLappTailImg[3].src = "/images/Lappland/R/Tail-2.png";
rLappTailImg[4].src = "/images/Lappland/R/Tail-1.png";
rLappTailImg[5].src = "/images/Lappland/R/Tail-0.png";
// N: 0-1-2-2-1-0-...
let rLappRibbonImg = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
rLappRibbonImg[0].src = "/images/Lappland/R/Ribbon-0.png";
rLappRibbonImg[1].src = "/images/Lappland/R/Ribbon-1.png";
rLappRibbonImg[2].src = "/images/Lappland/R/Ribbon-2.png";
rLappRibbonImg[3].src = "/images/Lappland/R/Ribbon-2.png";
rLappRibbonImg[4].src = "/images/Lappland/R/Ribbon-1.png";
rLappRibbonImg[5].src = "/images/Lappland/R/Ribbon-0.png";
// P: ...-0-0-1-2-1-0-0-...
let rLappFaceImg = [new Image(), new Image(), new Image(), new Image()];
rLappFaceImg[0].src = "/images/Lappland/R/Face-0.png";
rLappFaceImg[1].src = "/images/Lappland/R/Face-1.png";
rLappFaceImg[2].src = "/images/Lappland/R/Face-2.png";
rLappFaceImg[3].src = "/images/Lappland/R/Face-1.png";
let rLappClothesImg = new Image();
rLappClothesImg.src = "/images/Lappland/R/Clothes.png";
let rLappLegnImg = new Image();
rLappLegnImg.src = "/images/Lappland/R/Leg.png";
// M(12): 1-2-3-4-5-6-7-6-5-4-3-2-...
let rLappLegImg = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(),
                   new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
rLappLegImg[0].src = "/images/Lappland/R/Leg-1.png";
rLappLegImg[1].src = "/images/Lappland/R/Leg-2.png";
rLappLegImg[2].src = "/images/Lappland/R/Leg-3.png";
rLappLegImg[3].src = "/images/Lappland/R/Leg-4.png";
rLappLegImg[4].src = "/images/Lappland/R/Leg-5.png";
rLappLegImg[5].src = "/images/Lappland/R/Leg-6.png";
rLappLegImg[6].src = "/images/Lappland/R/Leg-7.png";
rLappLegImg[7].src = "/images/Lappland/R/Leg-6.png";
rLappLegImg[8].src = "/images/Lappland/R/Leg-5.png";
rLappLegImg[9].src = "/images/Lappland/R/Leg-4.png";
rLappLegImg[10].src = "/images/Lappland/R/Leg-3.png";
rLappLegImg[11].src = "/images/Lappland/R/Leg-2.png";
let rLappArmBnImg = new Image();
rLappArmBnImg.src = "/images/Lappland/R/ArmB.png";
// M(12): 0-1-2-3-4-5-6-5-4-3-2-1-...
let rLappArmBImg = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(),
                    new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
rLappArmBImg[0].src = "/images/Lappland/R/ArmB-0.png";
rLappArmBImg[1].src = "/images/Lappland/R/ArmB-1.png";
rLappArmBImg[2].src = "/images/Lappland/R/ArmB-2.png";
rLappArmBImg[3].src = "/images/Lappland/R/ArmB-3.png";
rLappArmBImg[4].src = "/images/Lappland/R/ArmB-4.png";
rLappArmBImg[5].src = "/images/Lappland/R/ArmB-5.png";
rLappArmBImg[6].src = "/images/Lappland/R/ArmB-6.png";
rLappArmBImg[7].src = "/images/Lappland/R/ArmB-5.png";
rLappArmBImg[8].src = "/images/Lappland/R/ArmB-4.png";
rLappArmBImg[9].src = "/images/Lappland/R/ArmB-3.png";
rLappArmBImg[10].src = "/images/Lappland/R/ArmB-2.png";
rLappArmBImg[11].src = "/images/Lappland/R/ArmB-1.png";
let rLappArmFnImg = new Image();
rLappArmFnImg.src = "/images/Lappland/R/ArmF.png";
// M(12): 0-1-2-3-4-5-6-5-4-3-2-1-...
let rLappArmFImg = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(),
                    new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
rLappArmFImg[0].src = "/images/Lappland/R/ArmF-0.png";
rLappArmFImg[1].src = "/images/Lappland/R/ArmF-1.png";
rLappArmFImg[2].src = "/images/Lappland/R/ArmF-2.png";
rLappArmFImg[3].src = "/images/Lappland/R/ArmF-3.png";
rLappArmFImg[4].src = "/images/Lappland/R/ArmF-4.png";
rLappArmFImg[5].src = "/images/Lappland/R/ArmF-5.png";
rLappArmFImg[6].src = "/images/Lappland/R/ArmF-6.png";
rLappArmFImg[7].src = "/images/Lappland/R/ArmF-5.png";
rLappArmFImg[8].src = "/images/Lappland/R/ArmF-4.png";
rLappArmFImg[9].src = "/images/Lappland/R/ArmF-3.png";
rLappArmFImg[10].src = "/images/Lappland/R/ArmF-2.png";
rLappArmFImg[11].src = "/images/Lappland/R/ArmF-1.png";
let rLappShadowImg = new Image();
rLappShadowImg.src = "/images/Lappland/R/Shadow.png";
// 图片 - Lappland - Left Direction
// Shock
let lLappShockImg = new Image();
lLappShockImg.src = "/images/Lappland/L/Shock.png";
// Bubbles
let lLappBubble1Img = new Image();
lLappBubble1Img.src = "/images/Lappland/L/Bubbles/Emo-1.png";
let lLappBubble2Img = new Image();
lLappBubble2Img.src = "/images/Lappland/L/Bubbles/Emo-2.png";
let lLappBubble3Img = new Image();
lLappBubble3Img.src = "/images/Lappland/L/Bubbles/Emo-3.png";
let lLappBubbleDizzyImg = new Image();
lLappBubbleDizzyImg.src = "/images/Lappland/L/Bubbles/Emo-dizzy.png";
let lLappBubbleSadImg = new Image();
lLappBubbleSadImg.src = "/images/Lappland/L/Bubbles/Emo-sad.png";
let lLappBubbleHappyImg = new Image();
lLappBubbleHappyImg.src = "/images/Lappland/L/Bubbles/Emo-happy.png";
// N: 0-1-2-2-1-0-...
let lLappHairImg = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
lLappHairImg[0].src = "/images/Lappland/L/Hair-0.png";
lLappHairImg[1].src = "/images/Lappland/L/Hair-1.png";
lLappHairImg[2].src = "/images/Lappland/L/Hair-2.png";
lLappHairImg[3].src = "/images/Lappland/L/Hair-2.png";
lLappHairImg[4].src = "/images/Lappland/L/Hair-1.png";
lLappHairImg[5].src = "/images/Lappland/L/Hair-0.png";
// N: 0-1-2-2-1-0-...
let lLappTailImg = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
lLappTailImg[0].src = "/images/Lappland/L/Tail-0.png";
lLappTailImg[1].src = "/images/Lappland/L/Tail-1.png";
lLappTailImg[2].src = "/images/Lappland/L/Tail-2.png";
lLappTailImg[3].src = "/images/Lappland/L/Tail-2.png";
lLappTailImg[4].src = "/images/Lappland/L/Tail-1.png";
lLappTailImg[5].src = "/images/Lappland/L/Tail-0.png";
// N: 0-1-2-2-1-0-...
let lLappRibbonImg = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
lLappRibbonImg[0].src = "/images/Lappland/L/Ribbon-0.png";
lLappRibbonImg[1].src = "/images/Lappland/L/Ribbon-1.png";
lLappRibbonImg[2].src = "/images/Lappland/L/Ribbon-2.png";
lLappRibbonImg[3].src = "/images/Lappland/L/Ribbon-2.png";
lLappRibbonImg[4].src = "/images/Lappland/L/Ribbon-1.png";
lLappRibbonImg[5].src = "/images/Lappland/L/Ribbon-0.png";
// P: ...-0-0-1-2-1-0-0-...
let lLappFaceImg = [new Image(), new Image(), new Image(), new Image()];
lLappFaceImg[0].src = "/images/Lappland/L/Face-0.png";
lLappFaceImg[1].src = "/images/Lappland/L/Face-1.png";
lLappFaceImg[2].src = "/images/Lappland/L/Face-2.png";
lLappFaceImg[3].src = "/images/Lappland/L/Face-1.png";
let lLappClothesImg = new Image();
lLappClothesImg.src = "/images/Lappland/L/Clothes.png";
let lLappLegnImg = new Image();
lLappLegnImg.src = "/images/Lappland/L/Leg.png";
// M(12): 1-2-3-4-5-6-7-6-5-4-3-2-...
let lLappLegImg = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(),
                   new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
lLappLegImg[0].src = "/images/Lappland/L/Leg-1.png";
lLappLegImg[1].src = "/images/Lappland/L/Leg-2.png";
lLappLegImg[2].src = "/images/Lappland/L/Leg-3.png";
lLappLegImg[3].src = "/images/Lappland/L/Leg-4.png";
lLappLegImg[4].src = "/images/Lappland/L/Leg-5.png";
lLappLegImg[5].src = "/images/Lappland/L/Leg-6.png";
lLappLegImg[6].src = "/images/Lappland/L/Leg-7.png";
lLappLegImg[7].src = "/images/Lappland/L/Leg-6.png";
lLappLegImg[8].src = "/images/Lappland/L/Leg-5.png";
lLappLegImg[9].src = "/images/Lappland/L/Leg-4.png";
lLappLegImg[10].src = "/images/Lappland/L/Leg-3.png";
lLappLegImg[11].src = "/images/Lappland/L/Leg-2.png";
let lLappArmBnImg = new Image();
lLappArmBnImg.src = "/images/Lappland/L/ArmB.png";
// M(12): 0-1-2-3-4-5-6-5-4-3-2-1-...
let lLappArmBImg = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(),
                    new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
lLappArmBImg[0].src = "/images/Lappland/L/ArmB-0.png";
lLappArmBImg[1].src = "/images/Lappland/L/ArmB-1.png";
lLappArmBImg[2].src = "/images/Lappland/L/ArmB-2.png";
lLappArmBImg[3].src = "/images/Lappland/L/ArmB-3.png";
lLappArmBImg[4].src = "/images/Lappland/L/ArmB-4.png";
lLappArmBImg[5].src = "/images/Lappland/L/ArmB-5.png";
lLappArmBImg[6].src = "/images/Lappland/L/ArmB-6.png";
lLappArmBImg[7].src = "/images/Lappland/L/ArmB-5.png";
lLappArmBImg[8].src = "/images/Lappland/L/ArmB-4.png";
lLappArmBImg[9].src = "/images/Lappland/L/ArmB-3.png";
lLappArmBImg[10].src = "/images/Lappland/L/ArmB-2.png";
lLappArmBImg[11].src = "/images/Lappland/L/ArmB-1.png";
let lLappArmFnImg = new Image();
lLappArmFnImg.src = "/images/Lappland/L/ArmF.png";
// M(12): 0-1-2-3-4-5-6-5-4-3-2-1-...
let lLappArmFImg = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(),
                    new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
lLappArmFImg[0].src = "/images/Lappland/L/ArmF-0.png";
lLappArmFImg[1].src = "/images/Lappland/L/ArmF-1.png";
lLappArmFImg[2].src = "/images/Lappland/L/ArmF-2.png";
lLappArmFImg[3].src = "/images/Lappland/L/ArmF-3.png";
lLappArmFImg[4].src = "/images/Lappland/L/ArmF-4.png";
lLappArmFImg[5].src = "/images/Lappland/L/ArmF-5.png";
lLappArmFImg[6].src = "/images/Lappland/L/ArmF-6.png";
lLappArmFImg[7].src = "/images/Lappland/L/ArmF-5.png";
lLappArmFImg[8].src = "/images/Lappland/L/ArmF-4.png";
lLappArmFImg[9].src = "/images/Lappland/L/ArmF-3.png";
lLappArmFImg[10].src = "/images/Lappland/L/ArmF-2.png";
lLappArmFImg[11].src = "/images/Lappland/L/ArmF-1.png";
let lLappShadowImg = new Image();
lLappShadowImg.src = "/images/Lappland/L/Shadow.png";
