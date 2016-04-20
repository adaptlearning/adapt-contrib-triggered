# adapt-contrib-triggered
An extension that hides components that can be triggered by a button.

[Visit the **Triggered** wiki](https://github.com/adaptlearning/adapt-contrib-triggered/wiki) for more information about its functionality and for explanations of key properties.

## Installation
* If **Triggered** has been uninstalled from the Adapt framework, it may be reinstalled.
With the [Adapt CLI](https://github.com/adaptlearning/adapt-cli) installed, run the following from the command line:
    `adapt install adapt-contrib-triggered`

    Alternatively, this component can also be installed by adding the following line of code to the *adapt.json* file:
    `"adapt-contrib-triggered": "*"`
    Then running the command:
    `adapt install`
    (This second method will reinstall all plug-ins listed in *adapt.json*.)

* If **Triggered** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).
<div float align=right><a href="#top">Back to Top</a></div>

## Settings overview

A complete example of this components settings can be found in the [example.json](https://github.com/adaptlearning/adapt-contrib-triggered/blob/master/example.json) file.

### Attributes

**_triggered** (object): The Triggered object that contains values for **_isEnabled**, **_top**, **_left**, **showButtonText**, and **hideButtonText**.

>**_isEnabled** (boolean): Enables/disables the **Triggered** extension.

>**_top** (number): Top position of Trigger show button in percentages.

>**_left** (number): Left position of Trigger show button in percentages.

>**showButtonText** (string): Show button text.

>**hideButtonText** (string): Hide button text.

## Limitations

To be completed

## Browser spec

This component has been tested to the standard Adapt browser specification.
