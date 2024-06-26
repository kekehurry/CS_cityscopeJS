import {PathLayer} from '@deck.gl/layers';

  /**
   * Data format:
   * [
   *   {
   *     path: [[-122.4, 37.7], [-122.5, 37.8], [-122.6, 37.85]],
   *     name: 'Richmond - Millbrae',
   *     color: [255, 0, 0]
   *   },
   *   ...
   * ]
   */
  export default function PathBaseLayer({data, opacity}){

    return new PathLayer({
          id: data.id,
          data: data.data,
          pickable: data.properties.pickable || true,
          widthScale: data.properties.widthScale || 20,
          widthMinPixels: data.properties.widthMinPixels || 2,
          getPath: d => d.path,
          getColor: d => d.color || [255, 0, 0],
          getWidth: d => d.width || 5,
          opacity
        });
      
    
  }
