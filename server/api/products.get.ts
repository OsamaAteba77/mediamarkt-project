// This acts as your "Local Express API"
export default defineEventHandler(() => {
  return [
    { 
      id: 'local-1', 
      title: 'iPhone 15', 
      price: 50000, 
      category: 'Telefon', 
      image: ' https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_120111127?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402' 
    },
    { 
      id: 'local-2', 
      title: ' MacBook Air', 
      price: 35000, 
      category: 'Bilgisayar', 
      image: ' https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_151157338?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402' 
    }
  ];
});