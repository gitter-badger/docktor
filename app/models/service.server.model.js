'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Variable Schema, not useful outside Image
 */
var VariableSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Variable Name cannot be blank'
    },
    description: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Port Schema, not useful outside Image
 */
var PortSchema = new Schema({
    internal: {
        type: Number,
        trim: true,
        required: 'internal Port cannot be blank'
    },
    description: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Volume Schema, not useful outside Image
 */
var VolumeSchema = new Schema({
    internal: {
        type: String,
        trim: true,
        required: 'internal Volume cannot be blank'
    },
    description: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Image Schema, not useful outside Service
 */
var ImageSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name cannot be blank'
    },
    created: {
        type: Date,
        default: Date.now
    },
    variables: [VariableSchema],
    ports: [PortSchema],
    volumes: [VolumeSchema],
    active: {
        type: Boolean,
        required: 'Active or not is required'
    }
});

/**
 * Service Schema
 */
var ServiceSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    images: [ImageSchema],
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Service', ServiceSchema);
