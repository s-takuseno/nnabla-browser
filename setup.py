from setuptools import setup
import glob

# get webpack outputs
pkg_dirs = glob.glob('nnabla_browser/dist/**/', recursive=True)
pkg_data = [f'{x.lstrip("nnabla_browser/")}*' for x in pkg_dirs]

setup(
    name="nnabla-browser",
    version="0.1.0b",
    description="A browser base visualizer for Neural Network Libraries (nnabla).",
    url='https://github.com/sony/nnabla-browser',
    author="Akio Hayakawa",
    license='Apache License 2.0',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'Intended Audience :: Education',
        'Intended Audience :: Science/Research',
        'License :: OSI Approved :: Apache Software License',
        'Topic :: Scientific/Engineering :: Artificial Intelligence',
        'Topic :: Software Development :: Libraries :: Python Modules',
        'Topic :: Scientific/Engineering :: Visualization'
        'Programming Language :: Python :: 3.6',
    ],
    install_requires=[
        "gevent",
        "flask",
        "flask_cors",
        "watchdog",
        "google",
        "protobuf",
        "numpy",
        "pyyaml",
        "requests",
        "nnabla"
    ],
    python_requires=">=3.6",
    packages=["nnabla_browser"],
    package_data={'nnabla_browser': pkg_data},
    include_package_data=True,
    entry_points={
        "console_scripts": [
            "nnabla-browser = nnabla_browser.server:main"
        ]
    }
)
