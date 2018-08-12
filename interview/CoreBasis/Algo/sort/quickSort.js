let qsort = fn =>([x,...xs]) => x == null ? []
: [
   ...qsort(fn)(xs.filter(a=>fn(a,x))),
   x,
   ...qsort(fn)(xs.filter(a=>!fn(a,x)))
  ]

qsort((a,b)=>a<b)([10,0,9,7,-999])