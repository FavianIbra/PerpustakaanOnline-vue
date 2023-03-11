<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Detail Transaksi</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   

    <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-20">
                            <div class="card card-primary card-outline">
                                <div class="card-body">
                                    <table class="table table-bordered">

                                    </table>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
    </template>
    <script>
    import NavigationBar from '../template/NavigationBar.vue'
    import AppSidebar from '../template/AppSidebar.vue'
    export default {
    components: {
        'navbar-component': NavigationBar,
        'sidebar-component': AppSidebar,
    },
}
    </script>

