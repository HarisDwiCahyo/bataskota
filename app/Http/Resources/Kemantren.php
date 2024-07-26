<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class Kemantren extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => 'FeatureCollection',
            'crs' => [
                'type' => 'name',
                'properties' => [
                    'name' => 'EPSG:4326',
                ],
            ],
            'features' => $this->collection->map(function ($item) {
                return [
                    'type' => 'Feature',
                    'geometry' => json_decode($item->geom),
                    'properties' => [
                        'gid' => $item->gid,
                        'kemantren' => $item->kemantren,
                        'kota' => $item->kota,
                        'srsid' => $item->srsid,
                        'kodekecamatan' => $item->kodekecamatan,
                        'peraturan' => $item->peraturan,
                        'batasutara' => $item->batasutara,
                        'batasselatan' => $item->batasselatan,
                        'batastimur' => $item->batastimur,
                        'batasbarat' => $item->batasbarat,
                        'beritaacara' => $item->beritaacara,
                    ],
                ];
            })->toArray(),
        ];
    }
}
