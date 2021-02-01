const raycaster = new THREE.Raycaster()

// By default, raycaster casts from 0 to Infinity (near = 0, far = Infinity)

// ================================================================================
// Custom raycasting
// --------------------------------------------------------------------------------

const rayOrigin = new THREE.Vector3(-5, 0, 0)
const rayDirection = new THREE.Vector3(10, 0, 0)

// Transform ray direction between 0 <---> 1, to make sure the ray direction's vector is still 1 unit long
rayDirection.normalize()

raycaster.set(rayOrigin, rayDirection)

// ================================================================================

// ================================================================================
// Raycaster intersection
// --------------------------------------------------------------------------------
// casting one object
raycaster.intersectObject(object)

// casting multiple objects (objects must be in array)
const objects = [object1, object2, object3]
raycaster.intersectObjects(objects)

// intersection object
// distance - length of distance between raycaster origin (usually the camera) and the object's face
// face - contains Face3(a, b, c) and the normal (x, y, z) of the face
// object - object intersected
// point - coordinate of the intersection in 3D world space (Vector3) (usually based on origin (0, 0, 0))
// uv - uv of intersection

// Raycaster mouse event
const mouse = new THREE.Vector2() // stores two values, (x, y)
let currentIntersect = null // objects currently intersected

// mouse enter & mouse leave
window.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e

  // normalize mouse between -1 and 1 according to three.js (x, y) axes
  mouse.x = (clientX / sizes.width) * 2 - 1
  mouse.y = -(clientY / sizes.height) * 2 + 1

  // using mouse coordinates based on the scene camera
  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects(objects)

  // mouse is intersecting with an object(s)
  const isIntersecting = intersects.length > 0

  if (isIntersecting) {
    // mouse enter
    if (!currentIntersect) {
      currentIntersect = intersects[0].object
      // change object color to green on mouse enter
      intersects[0].object.material.color.set("green")
    }
  } else {
    // mouse leave
    if (currentIntersect) {
      currentIntersect = null
      // change all objects' colors to blue on mouse leave (their default states)
      objects.forEach((obj) => obj.material.color.set("blue"))
    }
  }
})

// mouse click
window.addEventListener("click", () => {
  if (currentIntersect) {
    // change clicked on object to orange
    switch (currentIntersect) {
      case object1:
        object1.material.color.set("orange")
        break
      case object2:
        object2.material.color.set("orange")
        break
      case object3:
        object3.material.color.set("orange")
        break
    }
  }
})

// ================================================================================
