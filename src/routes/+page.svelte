<script lang="ts">
  import { dev } from '$app/environment';
  import type { PageProps } from './$types';
	let { data }: PageProps = $props();

  import { onMount } from 'svelte';

  let syncWorker: Worker | undefined = undefined;

  const loadWorker = async () => {
    const SyncWorker = await import('$lib/canvas.worker?worker');
    syncWorker = new SyncWorker.default();
    syncWorker.onmessage = ( { data } ) => {
      if( data == null ) return;

      if (data.type === 'progress') {
        console.log('Progress:', data?.progress + '%');

      } else if (data.type === 'result') {

        const { imageData, width, height } = data;
        const newSize = imageData.data.byteLength / 1024;

        console.log( "its Only! ", newSize );
        

        const ctx = myCanvas.getContext('2d')!;
        const clampedArray = new Uint8ClampedArray(imageData.data)
        const newImageData = ctx.createImageData(width, height);
        newImageData.data.set(clampedArray)
        ctx.putImageData(newImageData, 0, 0);
        console.log('Edge detection complete!');

      } else if (data.type === 'error') {
        console.error('Error:', data.error);
      }
    };
  };
  
  let count = $state( 0 );

  const incr = () => count++;
  const decr = () => --count;

  let myCanvas: HTMLCanvasElement;
  let imageLoader: HTMLInputElement;

  function detectEdges() {
    if( syncWorker ) {
      const ctx = myCanvas.getContext('2d')!;
      const imageData = ctx.getImageData(0, 0, myCanvas.width, myCanvas.height);
      const originalSize = imageData.data.byteLength / 1024;
      console.log( originalSize );
      
      syncWorker.postMessage({ id: "image", imageData: imageData, width: myCanvas.width, height: myCanvas.height });
    }
  }

  $effect( () => {
    var ctx = myCanvas.getContext('2d')!;
    
    imageLoader.addEventListener('change', ( changeEv ) => {
      const loader = changeEv.currentTarget! as HTMLInputElement;
      const reader = new FileReader();

      reader.onload = function( ev ){
        var img = new Image();

        img.onload = function() {
          myCanvas.width = img.width;
          myCanvas.height = img.height;
          ctx.drawImage( img, 0, 0 );
        }

        img.src = ev?.target?.result as string;
      };

      if( loader.files?.[0] != null ) {
        reader.readAsDataURL( loader.files[0] );
      }

    }, false);
  });

  onMount( () => {
    loadWorker();
  })
</script>

<h1>Counter: { count }</h1>
<button onclick={ incr } >+</button>
<button onclick={ decr } >--</button>
<br/>
<h2>{ data.name.thing1 + " " + data.name.thing2 }</h2>
<div>{@html data.name.link}</div>
<br/>
<label>Load Image (png/jpg):
  <input type="file" id="imageLoader" name="imageLoader" bind:this={ imageLoader }/>
</label>
<br/>
<button onclick={ detectEdges }>Edge-Detect</button>
<br/>
<canvas id="myCanvas" bind:this={ myCanvas } ></canvas>

<style>
  #myCanvas {
    border: black 2px solid;
  }
</style>