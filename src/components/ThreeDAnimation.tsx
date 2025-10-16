import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { SquareCodeIcon, Camera, Move3D, Brain} from 'lucide-react';


const ThreeDAnimation: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // For mouse rotation
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const modelRef = useRef<THREE.Group | null>(null);

  const benefits = [
    {
  icon: <SquareCodeIcon className="w-6 h-6 text-white" />,
  title: "3D Modeling",
  description: "Craft detailed objects",
  color: "from-purple-500 to-indigo-500"
},
{
  icon: <Camera className="w-6 h-6 text-white" />,
  title: "Rendering",
  description: "Photoreal visuals",
  color: "from-orange-500 to-red-500"
},
{
  icon: <Move3D className="w-6 h-6 text-white" />,
  title: "Animation",
  description: "Bring designs to life",
  color: "from-green-500 to-emerald-500"
},
{
  icon: <Brain className="w-6 h-6 text-white" />,
  title: "AI Assistance",
  description: "Boost speed with AI",
  color: "from-cyan-500 to-blue-500"
}

  ];

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 1); // Changed alpha to 1 for a solid background
    mountRef.current.appendChild(renderer.domElement);

    // Add stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02 });
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      // Ensure stars are further away than the model
      const distance = Math.sqrt(x*x + y*y + z*z);
      if (distance < 100) continue; // Skip stars too close to the center
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Load 3D model
    const loader = new GLTFLoader();
    const modelUrl = 'https://d2ah09ed4k10ng.cloudfront.net/gangnam_style_dancing_rabbit_character.glb';
    
    let mixer: THREE.AnimationMixer | null = null;
    
    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        modelRef.current = model;
        
        // Center and scale model 
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 6 / maxDim;
        
        model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
        model.scale.set(scale, scale, scale);
        
        // Set up animations if available
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }
        
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
        setError('Failed to load 3D model. Please try again later.');
        setLoading(false);
      }
    );

    camera.position.z = 5;

    // Mouse event handlers for rotation
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
      if (mountRef.current) mountRef.current.style.cursor = 'grabbing';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !modelRef.current) return;
      
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;
      
      modelRef.current.rotation.y += deltaX * 0.01;
      modelRef.current.rotation.x += deltaY * 0.01;
      
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
      if (mountRef.current) mountRef.current.style.cursor = 'grab';
    };

    mountRef.current.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update animations
      if (mixer) {
        mixer.update(clock.getDelta());
      }

      // Animate stars (e.g., slow rotation)
      if (stars) {
        stars.rotation.x += 0.0001;
        stars.rotation.y += 0.0001;
      }
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = mountRef.current!.clientWidth / mountRef.current!.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      if (mixer) {
        mixer.stopAllAction();
      }
    };
  }, []);

  return (
    <section className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <div className="bg-black-800 p-6 rounded-lg">
              <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent mb-6 leading-tight">
              We Bring Life<br />
              <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                To Your Visions
              </span>
            </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                Transform concepts into photorealistic 3D models powered by AI-assisted design.
                Our solutions blend artistic creativity with technical precision for immersive experiences.
              </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{benefit.title}</h4>
                        <p className="text-white/70 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
          
          <div className="w-full md:w-1/2 relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-lg">
                <div className="text-white text-lg">Loading 3D model...</div>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-900 rounded-lg">
                <div className="text-white text-lg">{error}</div>
              </div>
            )}
            <div 
              className="three-d-animation" 
              ref={mountRef} 
              style={{ 
                width: '100%', 
                height: '400px', 
                borderRadius: '8px', 
                overflow: 'hidden',
                cursor: loading ? 'default' : 'grab'
              }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeDAnimation;