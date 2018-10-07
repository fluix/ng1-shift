#!/bin/bash

HOME=$(pwd)

# Link ui-kit
rm -f $HOME/node_modules/ng1-shift
ln -sf $HOME/../ $HOME/node_modules/ng1-shift
