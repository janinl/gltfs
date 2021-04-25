//Tree generator code
var coordSystem = function (b) { var g = b.normalize(); b = 0 == Math.abs(b.x) && 0 == Math.abs(b.y) ? (new BABYLON.Vector3(b.z, 0, 0)).normalize() : (new BABYLON.Vector3(b.y, -b.x, 0)).normalize(); var r = BABYLON.Vector3.Cross(b, g); return { x: b, y: g, z: r } }, randPct = function (b, g) { return 0 == g ? b : (1 + (1 - 2 * Math.random()) * g) * b }, createBranch = function (b, g, r, w, h, l, v, n, x) { for (var t = [], d, c = [], f, q = [], a = 0; 12 > a; a++)t[a] = []; for (var m = 0; m < h; m++)for (a = m / h, d = g.y.scale(a * r), d.addInPlace(g.x.scale(v * Math.exp(-a) * Math.sin(l * a * Math.PI))), d.addInPlace(b), c[m] = d, d = n * (1 + (.4 * Math.random() - .2)) * (1 - (1 - w) * a), q.push(d), a = 0; 12 > a; a++)f = a * Math.PI / 6, f = g.x.scale(d * Math.cos(f)).add(g.z.scale(d * Math.sin(f))), f.addInPlace(c[m]), t[a].push(f); for (a = 0; 12 > a; a++)t[a].push(c[c.length - 1]); return { branch: BABYLON.MeshBuilder.CreateRibbon("branch", { pathArray: t, closeArray: !0 }, x), core: c, _radii: q } }, createTreeBase = function (b, g, r, w, h, l, v, n, x, t) { var d = 2 / (1 + Math.sqrt(5)), c = new BABYLON.Vector3(0, 1, 0), f, c = coordSystem(c), q = new BABYLON.Vector3(0, 0, 0), a = [], m = [], e = [], A = [], q = createBranch(q, c, b, g, r, 1, x, 1, t); a.push(q.branch); var y = q.core; m.push(y); e.push(q._radii); A.push(c); for (var q = y[y.length - 1], y = 2 * Math.PI / h, z, u, p, C, B = 0; B < h; B++)if (f = randPct(B * y, .25), f = c.y.scale(Math.cos(randPct(l, .15))).add(c.x.scale(Math.sin(randPct(l, .15)) * Math.sin(f))).add(c.z.scale(Math.sin(randPct(l, .15)) * Math.cos(f))), z = coordSystem(f), f = createBranch(q, z, b * v, g, r, n, x * d, g, t), p = f.core, p = p[p.length - 1], a.push(f.branch), m.push(f.core), e.push(f._radii), A.push(z), 1 < w) for (var D = 0; D < h; D++)u = randPct(D * y, .25), u = z.y.scale(Math.cos(randPct(l, .15))).add(z.x.scale(Math.sin(randPct(l, .15)) * Math.sin(u))).add(z.z.scale(Math.sin(randPct(l, .15)) * Math.cos(u))), u = coordSystem(u), C = createBranch(p, u, b * v * v, g, r, n, x * d * d, g * g, t), a.push(C.branch), m.push(C.core), e.push(f._radii), A.push(u); return { tree: BABYLON.Mesh.MergeMeshes(a), paths: m, radii: e, directions: A } }, createTree = function (b, g, r, w, h, l, v, n, x, t, d, c, f, q, a, m) { 1 != h && 2 != h && (h = 1); var e = createTreeBase(b, g, r, h, l, v, n, d, c, m); e.tree.material = w; var A = b * Math.pow(n, h), y = A / (2 * f), z = 1.5 * Math.pow(g, h - 1); n = BABYLON.MeshBuilder.CreateDisc("leaf", { radius: z / 2, tessellation: 12, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, m); b = new BABYLON.SolidParticleSystem("leaveSPS", m, { updatable: !1 }); b.addShape(n, 2 * f * Math.pow(l, h), { positionFunction: function (b, a, g) { a = Math.floor(g / (2 * f)); 1 == h ? a++ : a = 2 + a % l + Math.floor(a / l) * (l + 1); var E = (g % (2 * f) * y + 3 * y / 2) / A, d = Math.ceil(r * E); d > e.paths[a].length - 1 && (d = e.paths[a].length - 1); var k = d - 1, c = k / (r - 1), m = d / (r - 1); b.position = new BABYLON.Vector3(e.paths[a][k].x + (e.paths[a][d].x - e.paths[a][k].x) * (E - c) / (m - c), e.paths[a][k].y + (e.paths[a][d].y - e.paths[a][k].y) * (E - c) / (m - c) + (.6 * z / q + e.radii[a][d]) * (g % 2 * 2 - 1), e.paths[a][k].z + (e.paths[a][d].z - e.paths[a][k].z) * (E - c) / (m - c)); b.rotation.z = Math.random() * Math.PI / 4; b.rotation.y = Math.random() * Math.PI / 2; b.rotation.z = Math.random() * Math.PI / 4; b.scale.y = 1 / q } }); b = b.buildMesh(); b.billboard = !0; n.dispose(); d = new BABYLON.SolidParticleSystem("miniSPS", m, { updatable: !1 }); n = new BABYLON.SolidParticleSystem("minileavesSPS", m, { updatable: !1 }); var u = []; c = 2 * Math.PI / l; for (var p = 0; p < Math.pow(l, h + 1); p++)u.push(randPct(Math.floor(p / Math.pow(l, h)) * c, .2)); c = function (a, b, d) { var c = d % Math.pow(l, h); 1 == h ? c++ : c = 2 + c % l + Math.floor(c / l) * (l + 1); var f = e.directions[c], c = new BABYLON.Vector3(e.paths[c][e.paths[c].length - 1].x, e.paths[c][e.paths[c].length - 1].y, e.paths[c][e.paths[c].length - 1].z), k = u[d], k = f.y.scale(Math.cos(randPct(v, 0))).add(f.x.scale(Math.sin(randPct(v, 0)) * Math.sin(k))).add(f.z.scale(Math.sin(randPct(v, 0)) * Math.cos(k))), f = BABYLON.Vector3.Cross(BABYLON.Axis.Y, k), k = Math.acos(BABYLON.Vector3.Dot(k, BABYLON.Axis.Y) / k.length()); a.scale = new BABYLON.Vector3(Math.pow(g, h + 1), Math.pow(g, h + 1), Math.pow(g, h + 1)); a.quaternion = BABYLON.Quaternion.RotationAxis(f, k); a.position = c; }; for (var C = [], B = [], p = e.paths.length, D = e.paths[0].length, F = 0; F < x; F++)C.push(2 * Math.PI * Math.random() - Math.PI), B.push([Math.floor(Math.random() * p), Math.floor(Math.random() * (D - 1) + 1)]); p = function (a, c, b) { var d = B[b][0], f = B[b][1], k = e.directions[d]; c = new BABYLON.Vector3(e.paths[d][f].x, e.paths[d][f].y, e.paths[d][f].z); c.addInPlace(k.z.scale(e.radii[d][f] / 2)); b = C[b]; k = k.y.scale(Math.cos(randPct(t, 0))).add(k.x.scale(Math.sin(randPct(t, 0)) * Math.sin(b))).add(k.z.scale(Math.sin(randPct(t, 0)) * Math.cos(b))); b = BABYLON.Vector3.Cross(BABYLON.Axis.Y, k); k = Math.acos(BABYLON.Vector3.Dot(k, BABYLON.Axis.Y) / k.length()); a.scale = new BABYLON.Vector3(Math.pow(g, h + 1), Math.pow(g, h + 1), Math.pow(g, h + 1)); a.quaternion = BABYLON.Quaternion.RotationAxis(b, k); a.position = c }; d.addShape(e.tree, Math.pow(l, h + 1), { positionFunction: c }); d.addShape(e.tree, x, { positionFunction: p }); d = d.buildMesh(); d.material = w; n.addShape(b, Math.pow(l, h + 1), { positionFunction: c }); n.addShape(b, x, { positionFunction: p }); w = n.buildMesh(); b.dispose(); w.material = a; a = BABYLON.MeshBuilder.CreateBox("", {}, m); a.isVisible = !1; e.tree.parent = a; d.parent = a; return w.parent = a };
var squirrelMesh;

//End of Tree generator code

var createScene = async function () {
	var scene = new BABYLON.Scene(engine);

	const plane = BABYLON.MeshBuilder.CreatePlane("plane", { height: 50, width: 100 });
	plane.rotation.x = Math.PI / 2
	var myMaterial = new BABYLON.StandardMaterial("myMaterial7", scene);
	myMaterial.diffuseColor = new BABYLON.Color3(0.13, 0.53, 0.2);
	plane.material = myMaterial;

	let squirrel = await BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/janinl/gtlfs/main/",
		"ThirdSquirrel_rigged4b_export3.gltf", scene);

	squirrelMesh = squirrel.meshes[0]
	//scene.createDefaultCameraOrLight(true, true, true);
	//scene.createDefaultEnvironment();
	squirrelMesh.position.x = 5
	squirrelMesh.position.y = 1.3
	squirrelMesh.position.z = -3
	squirrelMesh.rotation = new BABYLON.Vector3(0, Math.PI, 0);
	//squirrel.meshes[0].scaling = new BABYLON.Vector3(10,1,10)
	
		


	scene.onKeyboardObservable.add((kbInfo) => {
		switch (kbInfo.type) {
			case BABYLON.KeyboardEventTypes.KEYDOWN:
				//console.log("KEY DOWN: kbInfo=", kbInfo);
				console.log("KEY DOWN: ", kbInfo.event.key);
				if (kbInfo.event.key == 'w') {
					squirrelMesh.position.x = squirrelMesh.position.x - 1
				}
				if (kbInfo.event.key == 's') {
					squirrelMesh.position.x = squirrelMesh.position.x + 1
				}
				if (kbInfo.event.key == ' ') {
					squirrelMesh.position.y += 1
				}
				if (kbInfo.event.key == 'Shift') {
					squirrelMesh.position.y--
				}
				if (kbInfo.event.key == 'a') {
					squirrelMesh.position.z--
				}
				if (kbInfo.event.key == 'd') {
					squirrelMesh.position.z++
				}
				if (kbInfo.event.key == 'q') {
					squirrelMesh.rotation.y++
				}
				if (kbInfo.event.key == 'e') {
					squirrelMesh.rotation.y--
				}
				if (kbInfo.event.key == 'z') {
					squirrel.animationGroups[0].stop()
				}
				if (kbInfo.event.key == 'x') {
					squirrel.animationGroups[0].start()
				}
				if (kbInfo.event.key == 'c') {
        console.log('squirrel:', squirrel)
        console.log('squirrelMesh:', squirrelMesh)
        /*
for(var i=0,length=squirrel.skeletons[0].bones.length;i<length;i++){
            console.log("Bone name: " + squirrel.skeletons[0].bones[i].name + " At Index: " + i);
        }
        */
        //					squirrel.animationGroups[0].start(true,3)
		var skeleton = squirrel.skeletons[0];
//skeleton.returnToRest();
        console.log('skeleton:', skeleton)
		//var animation = scene.beginAnimation(skeleton, 0, 100, true, 1.0);
        //console.log('animation:', animation)
		var bone = skeleton.bones[2];
        console.log('bone:', bone)
		var scale = 10;
		bone.scale(scale, scale, scale, true);
		var bone1AxesViewer = new BABYLON.Debug.BoneAxesViewer(scene, bone, squirrelMesh);
			bone.rotate(BABYLON.Axis.Z, .1, BABYLON.Space.WORLD, squirrelMesh);

		var transformNode = squirrel.transformNodes[4];
        console.log('transformNode:', transformNode);
        //transformNode.rotate(BABYLON.Axis.Z, .1);
		//transformNode.scale(scale, scale, scale, true);

        transformNode.rotation.y += 0.1;
        console.log('transformNode.rotation:', transformNode.rotation);
				}
				break;
			case BABYLON.KeyboardEventTypes.KEYUP:
				console.log("KEY UP: ", kbInfo.event.keyCode);
				break;
		}

	});


 var mesh_tail001 = scene.getMeshByName('tail.001')
        console.log('mesh_tail001:', mesh_tail001);
 var transformNode_tail001 = scene.getTransformNodeByName('tail.001')
        console.log('transformNode_tail001:', transformNode_tail001);


        var transformNode = new BABYLON.TransformNode("root22");
    //var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

    squirrelMesh.parent = transformNode;
    var increment = 0, count

        scene.registerBeforeRender(function() {
            //transformNode.rotation.y += 0.1;
            //transformNode_tail001.position.y += 0.1;
        console.log('transformNode_tail001:.rotationQuaternion', transformNode_tail001.rotationQuaternion);
            if (transformNode_tail001.rotationQuaternion) {
                const euler = transformNode_tail001.rotationQuaternion.toEulerAngles();
                transformNode_tail001.rotationQuaternion = null;
                transformNode_tail001.rotation = euler;
                increment = 0.01
                count = 50
            }
            if (increment) {
                transformNode_tail001.rotation.x += increment;
                if (count--==0) {
                    increment = -increment
                    count = 50
                }
            }
            //squirrel.transformNodes[2].rotation.y += 0.1;
        });


	scene.debugLayer.show()














	var camera = new BABYLON.ArcRotateCamera("Camera", -3 * Math.PI / 8, 3 * Math.PI / 8, 80, BABYLON.Vector3.Zero(), scene);

	camera.attachControl(canvas, false);


	// lights
	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(50, 50, 0), scene);
	light.intensity = 0.8;

	//leaf material
	var green = new BABYLON.StandardMaterial("green", scene);
	green.diffuseColor = new BABYLON.Color3(0, 1, 0);

	//trunk and branch material
	var bark = new BABYLON.StandardMaterial("bark", scene);
	bark.emissiveTexture = new BABYLON.Texture("https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Bark_texture_wood.jpg/800px-Bark_texture_wood.jpg", scene);
	bark.diffuseTexture = new BABYLON.Texture("https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Bark_texture_wood.jpg/800px-Bark_texture_wood.jpg", scene);
	bark.diffuseTexture.uScale = 2.0;//Repeat 5 times on the Vertical Axes
	bark.diffuseTexture.vScale = 2.0;//Repeat 5 times on the Horizontal Axes		

	//Tree parameters			
	var trunk_height = 20;
	var trunk_taper = 0.6;
	var trunk_slices = 5;
	var boughs = 2; // 1 or 2
	var forks = 4;
	var fork_angle = Math.PI / 4;
	var fork_ratio = 2 / (1 + Math.sqrt(5)); //PHI the golden ratio
	var branch_angle = Math.PI / 3;
	var bow_freq = 2;
	var bow_height = 3.5;
	var branches = 10;
	var leaves_on_branch = 5;
	var leaf_wh_ratio = 0.5;

	var tree = createTree(trunk_height, trunk_taper, trunk_slices, bark, boughs, forks, fork_angle, fork_ratio, branches, branch_angle, bow_freq, bow_height, leaves_on_branch, leaf_wh_ratio, green, scene);
	//tree.position.y = -10;


	return scene;

};
