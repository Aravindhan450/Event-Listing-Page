import React from 'react';

export default function Page() {
  return (
    <>
{/*  TopNavBar Component  */}
<header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md shadow-sm border-b border-outline-variant/10">
<div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
<div className="text-2xl font-bold text-indigo-900 tracking-tight">The Kinetic Curator</div>
<nav className="hidden md:flex items-center gap-8">
<a className="text-indigo-600 font-semibold border-b-2 border-indigo-600 py-1 transition-all" href="#">Explore</a>
<a className="text-slate-500 hover:text-indigo-500 py-1 transition-all" href="#">Trending</a>
<a className="text-slate-500 hover:text-indigo-500 py-1 transition-all" href="#">Collections</a>
</nav>
<div className="flex items-center gap-4">
<button className="p-2 rounded-full hover:bg-slate-100/50 transition-all active:scale-90 duration-200">
<span className="material-symbols-outlined text-slate-600">notifications</span>
</button>
<div className="h-10 w-10 rounded-full bg-surface-container-high overflow-hidden">
<img alt="User profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq97LqPqi3f4nygZvPIkMPn1OOwXaK4o6Lz5VZ0lCIYfdIlkd6KxWw0tzS5XT_aidlu_4p_qXjYra8jyrhBvy83gjtyQZdiRrveV0vLQsrbdnAdoMkiZeAJ--Ur0fVRYFUVMrj-EtCaNnfKvqyAzr-AhYJua1XtR8aqYM_Rb50cgVXANnmQzQPa3fU-KvlkfMAvuadTwsqxcNJ04zE2f9ELzklDQtNUgrm1fJKHiEyu6wYbur-KF7ocMoev_dtWsEarz8Hk1QAhPaB"/>
</div>
</div>
</div>
</header>
<main className="pt-24 pb-16 px-6 max-w-7xl mx-auto w-full">
{/*  Hero Search Section  */}
<section className="mb-12">
<div className="max-w-4xl mx-auto text-center mb-10">
<h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-on-surface mb-6">Master the tech stack.</h1>
<p className="text-on-surface-variant text-lg">Curated engineering and software experiences for the modern developer.</p>
</div>
<div className="bg-surface-container-lowest rounded-xl editorial-shadow p-2 md:p-4 flex flex-col md:flex-row gap-4 items-center">
<div className="relative w-full md:flex-1">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface" placeholder="Search frameworks, summits, or workshops..." type="text"/>
</div>
<div className="flex flex-wrap justify-center gap-2 px-2">
<button className="px-6 py-2 rounded-full bg-secondary-container text-on-secondary-container text-sm font-medium hover:bg-secondary-fixed transition-colors">Development</button>
<button className="px-6 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-secondary-container transition-colors">DevOps</button>
<button className="px-6 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-secondary-container transition-colors">AI/ML</button>
<button className="px-6 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-secondary-container transition-colors">Cloud</button>
<button className="px-6 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-secondary-container transition-colors">Cybersecurity</button>
</div>
<div className="flex items-center gap-3 pl-4 border-l border-outline-variant/20">
<span className="text-sm font-medium text-on-surface-variant">Live</span>
<button className="w-12 h-6 bg-primary-container rounded-full relative p-1 transition-colors">
<div className="w-4 h-4 bg-primary rounded-full absolute right-1"></div>
</button>
</div>
</div>
</section>
{/*  Events Grid  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
{/*  Event Card 1  */}
<div className="group bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden transition-all hover:scale-[1.02] border border-outline-variant/10 flex flex-col">
<div className="relative h-48 overflow-hidden bg-slate-200">
<img alt="Cloud Native Summit" className="w-full h-full object-cover transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVFH_vjQ8ybBWYUZAinRrFfnhCDPcn7zTbDKpEZdkkChSlEnalRzevsLsWW6k9-A9NXKObEVqntT1kHY7BVyJduUJP_9YCBJX4mNM_YfxkWk1fZA-Km-WGWEtv4lzSpLRJgzHbiyW1NALrR1AwavplYl8h6sT6r3yH-cZwjd8rmp7Qb87qqb782XK_R6KE6oIWG3a8Gc4Xq4pnmwSBXSDWTtQJX9g_uhtnRe5tSvVBSZXqiOosKY2mmpMPsxpPKueLCri6cwaew67b"/>
<button className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 backdrop-blur-sm text-on-surface hover:text-red-500 transition-colors">
<span className="material-symbols-outlined !text-xl">favorite</span>
</button>
</div>
<div className="p-5 flex flex-col flex-1">
<div className="flex items-center justify-between mb-2">
<span className="text-[10px] uppercase tracking-widest font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">Summit</span>
<span className="text-xs text-on-surface-variant">Nov 15, 2024 • 09:00 AM</span>
</div>
<h3 className="text-lg font-bold text-on-surface mb-4 line-clamp-2 leading-tight">Cloud Native Summit: Scaling Infrastructure</h3>
<div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/10">
<button className="text-primary text-sm font-semibold hover:underline">View Details</button>
<button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">share</span>
</button>
</div>
</div>
</div>
{/*  Event Card 2  */}
<div className="group bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden transition-all hover:scale-[1.02] border border-outline-variant/10 flex flex-col">
<div className="relative h-48 overflow-hidden bg-slate-200">
<img alt="AI Ethics Workshop" className="w-full h-full object-cover transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOcxSNTqPhflWkbHJge_jfcFh2RoFi4FKMkukZFJjpGvhujl9P6wyt-D_b1wmDiGO6_jRq36bzE9rGGEZG2oXIeXYh6Tg_NrkKKdwXdXRj6NlPXl8txYmYOfPLbR_PisixVEfyrGwjOqJpJywRsaszYU7gY7TdGONZ4R-VklqVWE_RZrLIB-IJGvLBXpuTlU2zleOT901LrAxfrqsw2d0hXqKQ5sUDvql-wjVuqdFZ7j7lso54gzr5F9W_UT4JoM8uf6La-ub-GLw7"/>
<button className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 backdrop-blur-sm text-on-surface hover:text-red-500 transition-colors">
<span className="material-symbols-outlined !text-xl">favorite</span>
</button>
</div>
<div className="p-5 flex flex-col flex-1">
<div className="flex items-center justify-between mb-2">
<span className="text-[10px] uppercase tracking-widest font-bold text-tertiary px-2 py-0.5 rounded-full bg-tertiary/10">Workshop</span>
<span className="text-xs text-on-surface-variant">Nov 18, 2024 • 02:00 PM</span>
</div>
<h3 className="text-lg font-bold text-on-surface mb-4 line-clamp-2 leading-tight">AI Ethics &amp; Alignment Workshop</h3>
<div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/10">
<button className="text-primary text-sm font-semibold hover:underline">View Details</button>
<button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">share</span>
</button>
</div>
</div>
</div>
{/*  Event Card 3  */}
<div className="group bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden transition-all hover:scale-[1.02] border border-outline-variant/10 flex flex-col">
<div className="relative h-48 overflow-hidden bg-slate-200">
<img alt="Rust Dev Days" className="w-full h-full object-cover transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf-3nR3ywLCHn5BdsYXJmMYYeZJFDYAgwKapXyPo43oQdPcBwmy6FyZcwCnAyAAT3L0jRDInKcVmE70g6zpWv3KLu-gLEDY-oNihd1lydpQOSLChskQ1jtkFVWMkR7QTFCRZEswg5P2fNSQG2UICof7NsB_tjkCD13SGl-CVhXY9Sj63aw41PAYEMTdWWD_2s2RxUYCE39Yb2nGQaqcG-Y7ij5ZP7sDZ6GAxVWgJtNpYZ34-4olMs6cBE6lNjDDlrBrUd64rDAUSfK"/>
<button className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 backdrop-blur-sm text-on-surface hover:text-red-500 transition-colors">
<span className="material-symbols-outlined !text-xl">favorite</span>
</button>
</div>
<div className="p-5 flex flex-col flex-1">
<div className="flex items-center justify-between mb-2">
<span className="text-[10px] uppercase tracking-widest font-bold text-secondary px-2 py-0.5 rounded-full bg-secondary/10">Conference</span>
<span className="text-xs text-on-surface-variant">Dec 02, 2024 • 10:00 AM</span>
</div>
<h3 className="text-lg font-bold text-on-surface mb-4 line-clamp-2 leading-tight">Rust Dev Days: Memory Safety at Scale</h3>
<div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/10">
<button className="text-primary text-sm font-semibold hover:underline">View Details</button>
<button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">share</span>
</button>
</div>
</div>
</div>
{/*  Event Card 4  */}
<div className="group bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden transition-all hover:scale-[1.02] border border-outline-variant/10 flex flex-col">
<div className="relative h-48 overflow-hidden bg-slate-200">
<img alt="Cyber Defense Expo" className="w-full h-full object-cover transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbTxSNgAiYB03FiSXEyOGR7PRO4PkLXklXhZ4rJOWL7C8asps_CEZP2j_6KX6EZRnVJYRNRZkiYLBpYXBqiWgU2E3sTOpx3tLFhrUIXhLjN7ktbjVLGmn7vfb2-BcEf8-Mubm4iWzdSLAgPfJKU6DjhpSHCi0MQa55oWEHIjDsXxWTbVNdDuIcIgrP9SxzlBFi0qvD8PgPGwzbPJjlixWoJHC1wWONiAqUL5ezh0DyoNB2Hk0YYK7y8AZfss_PiZvZXzV-VkByhdG3"/>
<button className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 backdrop-blur-sm text-on-surface hover:text-red-500 transition-colors">
<span className="material-symbols-outlined !text-xl">favorite</span>
</button>
</div>
<div className="p-5 flex flex-col flex-1">
<div className="flex items-center justify-between mb-2">
<span className="text-[10px] uppercase tracking-widest font-bold text-on-error-container px-2 py-0.5 rounded-full bg-error-container/20">Security</span>
<span className="text-xs text-on-surface-variant">Dec 05, 2024 • 09:30 AM</span>
</div>
<h3 className="text-lg font-bold text-on-surface mb-4 line-clamp-2 leading-tight">Cyber Defense Expo 2024</h3>
<div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/10">
<button className="text-primary text-sm font-semibold hover:underline">View Details</button>
<button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">share</span>
</button>
</div>
</div>
</div>
{/*  Event Card 5  */}
<div className="group bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden transition-all hover:scale-[1.02] border border-outline-variant/10 flex flex-col">
<div className="relative h-48 overflow-hidden bg-slate-200">
<img alt="Modern Frontend Summit" className="w-full h-full object-cover transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjNZMKV9pN2HZDjE9X3hP0chR4Aa9wrwLfFcYu2JvMSTny_h1fURxLhwik8U1N8cFtKjFzXw9pcLehb1OTE_R3__II6IaPGUc3KcDNfCiJdBtoF5T50cIm_BiANVnFKYnR4UzfWLia3QG3JPgE4pod5TT0AYrw0910LsOcvqdpWKGamXzREXU-EI-Nh6YePwWLcq1oU_b7gsisFGW7xtbdWzVR5MEh33Sbpb44tW5xz4L1jN68HHiQ_mMm0j-Vmu_hs84J_bZ7th21"/>
<button className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 backdrop-blur-sm text-on-surface hover:text-red-500 transition-colors">
<span className="material-symbols-outlined !text-xl">favorite</span>
</button>
</div>
<div className="p-5 flex flex-col flex-1">
<div className="flex items-center justify-between mb-2">
<span className="text-[10px] uppercase tracking-widest font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">Frontend</span>
<span className="text-xs text-on-surface-variant">Dec 10, 2024 • 11:00 AM</span>
</div>
<h3 className="text-lg font-bold text-on-surface mb-4 line-clamp-2 leading-tight">Modern Frontend Architecture Summit</h3>
<div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/10">
<button className="text-primary text-sm font-semibold hover:underline">View Details</button>
<button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">share</span>
</button>
</div>
</div>
</div>
{/*  Event Card 6  */}
<div className="group bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden transition-all hover:scale-[1.02] border border-outline-variant/10 flex flex-col">
<div className="relative h-48 overflow-hidden bg-slate-200">
<img alt="Data Science Forum" className="w-full h-full object-cover transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQe9rH3ThlnipnuHFCl3WAFUzOhrnwe_pXjNjaB0vhpCI9Mlx8fcf7kbO3dPBJtT_g4DRo8IbuNjqvdwtViAT8OF8NkEZ7MX47FMyPH5KhmQGW85MHQgTCuyDGowBvulvwE5I_7YzQPirfy6E3_a1LWkV2vJI8T8LsiVOCqy2O9mdWStlPFTJhYZrAu_3ochaUaUqo3tIxhnHyd0LJ8L99S0g4r-bxQfmuYGbHVFjs0eLeeY8Cnrjv7vqCzCTt3DVqhB-fRHHRWQ83"/>
<button className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 backdrop-blur-sm text-on-surface hover:text-red-500 transition-colors">
<span className="material-symbols-outlined !text-xl">favorite</span>
</button>
</div>
<div className="p-5 flex flex-col flex-1">
<div className="flex items-center justify-between mb-2">
<span className="text-[10px] uppercase tracking-widest font-bold text-secondary px-2 py-0.5 rounded-full bg-secondary/10">Data</span>
<span className="text-xs text-on-surface-variant">Dec 12, 2024 • 01:00 PM</span>
</div>
<h3 className="text-lg font-bold text-on-surface mb-4 line-clamp-2 leading-tight">Global Data Science Forum</h3>
<div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/10">
<button className="text-primary text-sm font-semibold hover:underline">View Details</button>
<button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">share</span>
</button>
</div>
</div>
</div>
{/*  Event Card 7  */}
<div className="group bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden transition-all hover:scale-[1.02] border border-outline-variant/10 flex flex-col">
<div className="relative h-48 overflow-hidden bg-slate-200">
<img alt="Kubernetes Masterclass" className="w-full h-full object-cover transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd55qQqUUw4GbBKlGS4JJ1G-0xNaPwZE1vR2vCK0i0--HjyQUSrkc-9V3CaPX_rzAgUJHY25oROcSkuKkkedwyjW4WXGI1ZkyxKNy-R0rOahBa6gEzzY9XCEffXAZHB21fzTvv7Bm_cL9urpJLEZtYkDLusb2FXlO-FcK2M4G6jeurU7YSFkx7pmS5shhd1po20YaheTjo44sLJgB7BStH_Vr8pTgvZl0rG6jfOBMhD38DjaCdOnkPKS1gzjnxF7KV4FO8SX4HvZig"/>
<button className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 backdrop-blur-sm text-on-surface hover:text-red-500 transition-colors">
<span className="material-symbols-outlined !text-xl">favorite</span>
</button>
</div>
<div className="p-5 flex flex-col flex-1">
<div className="flex items-center justify-between mb-2">
<span className="text-[10px] uppercase tracking-widest font-bold text-tertiary px-2 py-0.5 rounded-full bg-tertiary/10">DevOps</span>
<span className="text-xs text-on-surface-variant">Dec 15, 2024 • 08:00 AM</span>
</div>
<h3 className="text-lg font-bold text-on-surface mb-4 line-clamp-2 leading-tight">Kubernetes Advanced Masterclass</h3>
<div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/10">
<button className="text-primary text-sm font-semibold hover:underline">View Details</button>
<button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">share</span>
</button>
</div>
</div>
</div>
{/*  Event Card 8  */}
<div className="group bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden transition-all hover:scale-[1.02] border border-outline-variant/10 flex flex-col">
<div className="relative h-48 overflow-hidden bg-slate-200">
<img alt="LLM Dev Workshop" className="w-full h-full object-cover transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN5o7tc12B5sehMyB_8BFU6qbk99UiHtu6yTgLcscJCJaUOjVz16hJcgN4ZwPABTQ58AEHPetC503n1ge_OexoSmsLeyTezT_CqRM2JZy1ZoNRc7FeHJkYYSXmPWN8gFvWuYFdQtM_0JBEi5_YIco1qIeYdzPHeHK4C3Jj4R6FDDMrfX6e2k9OJkogPjkNCFgrDJhpRa8dmtBKtwJmvZTQUi5jJa1udzUwBYP6Mrad6laRCe-eUj-jIv2Tj3KxcIhBT6TQc9Ox0Epy"/>
<button className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 backdrop-blur-sm text-on-surface hover:text-red-500 transition-colors">
<span className="material-symbols-outlined !text-xl">favorite</span>
</button>
</div>
<div className="p-5 flex flex-col flex-1">
<div className="flex items-center justify-between mb-2">
<span className="text-[10px] uppercase tracking-widest font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">AI</span>
<span className="text-xs text-on-surface-variant">Dec 18, 2024 • 03:00 PM</span>
</div>
<h3 className="text-lg font-bold text-on-surface mb-4 line-clamp-2 leading-tight">Building Applications with LLMs</h3>
<div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/10">
<button className="text-primary text-sm font-semibold hover:underline">View Details</button>
<button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">share</span>
</button>
</div>
</div>
</div>
{/*  Event Card 9  */}
<div className="group bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden transition-all hover:scale-[1.02] border border-outline-variant/10 flex flex-col">
<div className="relative h-48 overflow-hidden bg-slate-200">
<img alt="Mobile Dev Expo" className="w-full h-full object-cover transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGpuO36kXUOE55e_lsqZ1D67RfApKuTAMcCF0_k0SXlofjtxr-lDZr5g6rQymwYhcOQ3Ue5RIzrRmh5__Egw6hahyFAjMczH2vVn3_dTEFwdF4qy5cg65_H19D-eE7CIiCVWoLrWRk825AbGp8Nza2GVNCX15OweeA1926neTIcq495FtOexJEvrAp4dxkLJJBMhQVC9NkSbEN-61vnh3f2HFqUI9jJnNRYPvTNdwu25M7XCndqAV-XIdVp1FlU70g-Lu4TDV87YDh"/>
<button className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 backdrop-blur-sm text-on-surface hover:text-red-500 transition-colors">
<span className="material-symbols-outlined !text-xl">favorite</span>
</button>
</div>
<div className="p-5 flex flex-col flex-1">
<div className="flex items-center justify-between mb-2">
<span className="text-[10px] uppercase tracking-widest font-bold text-secondary px-2 py-0.5 rounded-full bg-secondary/10">Mobile</span>
<span className="text-xs text-on-surface-variant">Jan 05, 2025 • 09:00 AM</span>
</div>
<h3 className="text-lg font-bold text-on-surface mb-4 line-clamp-2 leading-tight">Native Mobile Dev Expo: iOS &amp; Android</h3>
<div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/10">
<button className="text-primary text-sm font-semibold hover:underline">View Details</button>
<button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">share</span>
</button>
</div>
</div>
</div>
{/*  Event Card 10  */}
<div className="group bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden transition-all hover:scale-[1.02] border border-outline-variant/10 flex flex-col">
<div className="relative h-48 overflow-hidden bg-slate-200">
<img alt="Ethical Hacking Workshop" className="w-full h-full object-cover transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-ZzVLodCIfZVQWCEzY82j7Hoq5b4X9-fNDr0VQYaGbmfd9W-qNbLmgELKn6dOYpwD7I1sdN75y2ObcxFh7O31U1Z8fq1M41YffGW8AkjvPnfTKmIRSXXigiAkpPDAJ7igQxoyHi5FL5nlZRyrP3AJkdLX85P0pLwa4fvCW4ldcZfXThjBnLDxzR8uaM-a1l9qDePH4N1mEkqVxAsetnq6twuF29yyfxgJfZ5XCX3rPJ74rqgpg0V_QHQbAIIG8SQmLgs_DL4nI58q"/>
<button className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 backdrop-blur-sm text-on-surface hover:text-red-500 transition-colors">
<span className="material-symbols-outlined !text-xl">favorite</span>
</button>
</div>
<div className="p-5 flex flex-col flex-1">
<div className="flex items-center justify-between mb-2">
<span className="text-[10px] uppercase tracking-widest font-bold text-on-error-container px-2 py-0.5 rounded-full bg-error-container/20">Hacking</span>
<span className="text-xs text-on-surface-variant">Jan 08, 2025 • 10:30 AM</span>
</div>
<h3 className="text-lg font-bold text-on-surface mb-4 line-clamp-2 leading-tight">Advanced Ethical Hacking Bootcamp</h3>
<div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/10">
<button className="text-primary text-sm font-semibold hover:underline">View Details</button>
<button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">share</span>
</button>
</div>
</div>
</div>
{/*  Event Card 11  */}
<div className="group bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden transition-all hover:scale-[1.02] border border-outline-variant/10 flex flex-col">
<div className="relative h-48 overflow-hidden bg-slate-200">
<img alt="Blockchain Summit" className="w-full h-full object-cover transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-CG4XznkAzR5GUoyr_xjK5YXDGPQB86SUJqo6MPVNtR8_lGGvbBSFY4qy3ufk2mH3WRSNXfaclPDqxf_GudAkeFiWqODRCi-wtYCoR7NExvQBxS4xkGMZxHJqtfPylEdVdWTYelWvo64GUSBrA4VQxjGo0WUYxP4jRDcCr4kHEy_eYXYdyGSW5P2a4PzvYlIhf7jg2_4n3CcIie23I1_B1pN8o9d-PGUgyMsRD4WlyPUTHk1dj4SXht5vPDRWSqYCcFTLgoqQf0Zz"/>
<button className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 backdrop-blur-sm text-on-surface hover:text-red-500 transition-colors">
<span className="material-symbols-outlined !text-xl">favorite</span>
</button>
</div>
<div className="p-5 flex flex-col flex-1">
<div className="flex items-center justify-between mb-2">
<span className="text-[10px] uppercase tracking-widest font-bold text-tertiary px-2 py-0.5 rounded-full bg-tertiary/10">Web3</span>
<span className="text-xs text-on-surface-variant">Jan 12, 2025 • 01:00 PM</span>
</div>
<h3 className="text-lg font-bold text-on-surface mb-4 line-clamp-2 leading-tight">Decentralized Future: Blockchain Summit</h3>
<div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/10">
<button className="text-primary text-sm font-semibold hover:underline">View Details</button>
<button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">share</span>
</button>
</div>
</div>
</div>
{/*  Event Card 12  */}
<div className="group bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden transition-all hover:scale-[1.02] border border-outline-variant/10 flex flex-col">
<div className="relative h-48 overflow-hidden bg-slate-200">
<img alt="Backend Performance" className="w-full h-full object-cover transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArtuEgUpkXmYf9j64hm6GO9Y9pwBnntzpiXnvvEKUVT-o45y-BBv8ptMeXJPeaLwAISH21171erH6aVWZKt5cG2lPHJT3Gfvx8Lc1esjpXEaMxlTNDHDm6ggWZp177GWm6wMrO-mD0TF9NQBzqQfOY2I1gzySWYxzzNIG4F2tcaUv8B3vCwtM0IB4pqvs4fD4_rAg2w5YWBy143JyxfkCskvbzz4ZhAVhSTcxLaVem3f8ja9MhwYCHaIqPQGIK5Q_QYPf23RIgYQ4E"/>
<button className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 backdrop-blur-sm text-on-surface hover:text-red-500 transition-colors">
<span className="material-symbols-outlined !text-xl">favorite</span>
</button>
</div>
<div className="p-5 flex flex-col flex-1">
<div className="flex items-center justify-between mb-2">
<span className="text-[10px] uppercase tracking-widest font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">Backend</span>
<span className="text-xs text-on-surface-variant">Jan 15, 2025 • 02:00 PM</span>
</div>
<h3 className="text-lg font-bold text-on-surface mb-4 line-clamp-2 leading-tight">High-Performance Backend Systems</h3>
<div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/10">
<button className="text-primary text-sm font-semibold hover:underline">View Details</button>
<button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">share</span>
</button>
</div>
</div>
</div>
{/*  Event Card 13  */}
<div className="group bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden transition-all hover:scale-[1.02] border border-outline-variant/10 flex flex-col">
<div className="relative h-48 overflow-hidden bg-slate-200">
<img alt="UI Design Summit" className="w-full h-full object-cover transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd9aebivXJxNea5RE9tg2W5_S0KenL8o5xo-MiSKc4ay1xyJJfR5VVC-M57ZqOLCfK5MeBVCJtn0VRho0uNafaOXRcc6BaBCjH0sjaZZHV4mk2jS9T7aXM9ml093j1yOWlJ0OGCkj8ZEOBoewiEjOrtsxOekRkMVpA8rq0kV9tOYQRo12vpr1AqpQFLvlJF1HTOtq3IiIC4_IWOCwj-MhnesoUFp-CgGto3vPvaJbq7NrX7mxqI0EK_MeKChc7UPgI6rxrmWF8KVbg"/>
<button className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 backdrop-blur-sm text-on-surface hover:text-red-500 transition-colors">
<span className="material-symbols-outlined !text-xl">favorite</span>
</button>
</div>
<div className="p-5 flex flex-col flex-1">
<div className="flex items-center justify-between mb-2">
<span className="text-[10px] uppercase tracking-widest font-bold text-secondary px-2 py-0.5 rounded-full bg-secondary/10">Design</span>
<span className="text-xs text-on-surface-variant">Jan 20, 2025 • 10:00 AM</span>
</div>
<h3 className="text-lg font-bold text-on-surface mb-4 line-clamp-2 leading-tight">Interface Design for Complex Software</h3>
<div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/10">
<button className="text-primary text-sm font-semibold hover:underline">View Details</button>
<button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">share</span>
</button>
</div>
</div>
</div>
{/*  Event Card 14  */}
<div className="group bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden transition-all hover:scale-[1.02] border border-outline-variant/10 flex flex-col">
<div className="relative h-48 overflow-hidden bg-slate-200">
<img alt="IoT Solutions" className="w-full h-full object-cover transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxBQSFxxBbRpImMGfnYpukvD6Wa_KZFUyLAcsvzUgz2bOvNDrA_5G5ZIxxcgU4_quta7xtd8n7qusxEcwM8bbNp6KUp_yOWz-TZyytOf_rcCQC3W_IkpGtSrIQDtu0kvCqpJgA3_HUtDLUfmFcoNo6OXqpUWY4A60UXO3ziUKog7hz9uJ4WAiefOhbV7h62QnyL7o4IjdzavHYYT0lBy4xUSNNGS6axGX5-35oTe0zoCYw-tpBJbmXbKRXzUUacwFbjsDJ6W3votts"/>
<button className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 backdrop-blur-sm text-on-surface hover:text-red-500 transition-colors">
<span className="material-symbols-outlined !text-xl">favorite</span>
</button>
</div>
<div className="p-5 flex flex-col flex-1">
<div className="flex items-center justify-between mb-2">
<span className="text-[10px] uppercase tracking-widest font-bold text-tertiary px-2 py-0.5 rounded-full bg-tertiary/10">IoT</span>
<span className="text-xs text-on-surface-variant">Jan 25, 2025 • 09:30 AM</span>
</div>
<h3 className="text-lg font-bold text-on-surface mb-4 line-clamp-2 leading-tight">Next-Gen IoT Systems &amp; Architecture</h3>
<div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/10">
<button className="text-primary text-sm font-semibold hover:underline">View Details</button>
<button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">share</span>
</button>
</div>
</div>
</div>
{/*  Event Card 15  */}
<div className="group bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden transition-all hover:scale-[1.02] border border-outline-variant/10 flex flex-col">
<div className="relative h-48 overflow-hidden bg-slate-200">
<img alt="Cloud Security" className="w-full h-full object-cover transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9aaS8bKy6dXNKOVWuDOQe6_NABIRR-aH0O9o38LrwLy8QmYGIPHg3eq22n7jgGzzuDq7dK-RNiDtJy-JE69BsiuNldlbdfShdRM5fG4L8XyL2GsZCXvYmIvviRxyfnBo4-9Pv01lHceX3-IU4objgcjXya343xlxISkR3ht0A1iLypTAf0mTaRoSG8XIZzYLd8CjarrbojUBOvhWMRIIuu7DvYt54abFR1lIPD-iBAq2XIAnsQPttkFk2OBsj_3xPrShPI5t7WDTU"/>
<button className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 backdrop-blur-sm text-on-surface hover:text-red-500 transition-colors">
<span className="material-symbols-outlined !text-xl">favorite</span>
</button>
</div>
<div className="p-5 flex flex-col flex-1">
<div className="flex items-center justify-between mb-2">
<span className="text-[10px] uppercase tracking-widest font-bold text-on-error-container px-2 py-0.5 rounded-full bg-error-container/20">Security</span>
<span className="text-xs text-on-surface-variant">Jan 28, 2025 • 11:00 AM</span>
</div>
<h3 className="text-lg font-bold text-on-surface mb-4 line-clamp-2 leading-tight">Zero Trust Security in Cloud Environments</h3>
<div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/10">
<button className="text-primary text-sm font-semibold hover:underline">View Details</button>
<button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">share</span>
</button>
</div>
</div>
</div>
</div>
</main>
<footer className="mt-auto border-t border-outline-variant/10 py-10 px-6 bg-surface-container-lowest">
<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
<div className="text-xl font-bold text-indigo-900 tracking-tight">The Kinetic Curator</div>
<div className="flex gap-8 text-sm text-on-surface-variant">
<a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
<a className="hover:text-primary transition-colors" href="#">Support</a>
</div>
<div className="text-sm text-on-surface-variant">© 2024 Kinetic Media Group.</div>
</div>
</footer>
    </>
  );
}
