<?php

function CreateWorkshop($name, $description, $image_link, $code):array { //Class for json response
    return [
        "name" => $name,
        "description" => $description,
        "image_link" => $image_link,
        "code" => $code
    ];
}


define("WORKSHOPS", array(
    CreateWorkshop(
        "Workshop 1",
        "This is a workshop about a thing",
        "https://media.nationalgeographic.org/assets/photos/000/207/20782.jpg",
        "a"
    ),
    CreateWorkshop(
        "Workshop 2",
        "This is another workshop about another thing",
        "https://media.architecturaldigest.com/photos/6081919db41653acb3f3a17b/16:9/w_2560%2Cc_limit/matt-artz-nTRDnDdDYk8-unsplash.jpg",
        "b"
    ),
    CreateWorkshop(
        "Workshop 3",
        "This is the third workshop, coolio, description here woot woot",
        "https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/types-of-solar-panels-section-1.jpg",
        "c"
    ),
    CreateWorkshop(
        "Workshop 4",
        "This is another longer description of this events. I don't know if I am typing it correctly because I am not looking, I am watching shrek while I am typing this. Shrek 4 to be specific",
        "https://www.generalkinematics.com/wp-content/uploads/2018/04/New-GK-2018-Size-2.png",
        "d"
    ),
    CreateWorkshop(
        "Workshop 5",
        "This is the description of event number 4. I am definitely running out of things to add to the description. Currently shre and all the other ogres are dancing because of the pied piper, Kind of a bop tbh.",
        "https://static.scientificamerican.com/sciam/cache/file/0E1B6E8A-E54C-424C-AA6D9EE54EB8BFF4_source.png",
        "e"
    ),
    CreateWorkshop(
        "Workshop 6",
        "This is a description of the 6th event, still watching Shrek 4. Fiona is mad at shrek. It is very sad, not pog champ. Donkey is funny",
        "https://slowaging.org/wp-content/uploads/2017/06/Fresh-food-for-healthy-aging.jpg",
        "f"
    )
));