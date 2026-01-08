"""
Mango Leaf Detection Utilities Package
"""

__version__ = '1.0.0'
__author__ = 'MangoLeaf AI Team'

from .predict import (
    predict_leaf,
    get_model_info,
    get_diagnosis_info,  # Legacy support
    determine_category,   # Legacy support
    CLASS_NAMES,
    DISEASE_CLASSES,
    NUTRIENT_CLASSES,
    DISEASE_TO_TREATMENT,
    NUTRIENT_TREATMENTS,
    DISEASE_TO_NUTRIENTS_SIMPLE
)

__all__ = [
    'predict_leaf',
    'get_model_info',
    'get_diagnosis_info',
    'determine_category',
    'CLASS_NAMES',
    'DISEASE_CLASSES',
    'NUTRIENT_CLASSES',
    'DISEASE_TO_TREATMENT',
    'NUTRIENT_TREATMENTS',
    'DISEASE_TO_NUTRIENTS_SIMPLE'
]