<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BatasPilar extends ResourceCollection
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
                        'kelurahan' => $item->kelurahan,
                        'kondisi' => $item->kondisi,
                        'east' => $item->east,
                        'south' => $item->south,
                        'nopilar' => $item->nopilar,
                        'northing' => $item->northing,
                        'easting' => $item->easting,
                        'up' => $item->up,
                        'peraturan' => $item->peraturan,
                        'perbatasan' => $item->perbatasan,
                        'alamat' => $item->alamat,
                        'pembuatan' => $item->pembuatan,
                        'pemeliharaan' => $item->pemeliharaan,
                        'beritaacara' => $item->beritaacara,
                        'foto' => $item->foto,

                    ],
                ];
            })->toArray(),
        ];
    }
}
