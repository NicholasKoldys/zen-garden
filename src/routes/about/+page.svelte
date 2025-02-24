<script>
  let count = $state( 0 );

  const x2 = () => { count = count*2 };
  const _2 = () => { count = count/2 };
  const odd = () => count = 3;
  const even = () => count = 2;
  const log = () => { console.log( count ) };

</script>

<h1>About: { count }</h1>
<button onclick={ x2 } >x</button>
<button onclick={ _2 } >/</button>
<button onclick={ odd } >ODD</button>
<button onclick={ even } >EVEN</button>
<button onclick={ log } >LOG</button>
